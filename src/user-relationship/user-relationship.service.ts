import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/User";
import { UserRelationship } from "src/entities/UserRelathionship";
import { Repository } from "typeorm";

@Injectable()
export class UserRelationshipService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(UserRelationship)
    private relathionRepo: Repository<UserRelationship>
  ) {}

  async follow(userId: number, targetId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException();
    }
    const userToFollow = await this.userRepo.findOne({
      where: { id: targetId },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const relation = new UserRelationship();
    relation.follower = user;
    relation.followed = userToFollow;

    const res = await this.relathionRepo.save(relation);

    return res;
  }

  async unfollow(userId: number, targetId: number) {
    const relation = await this.relathionRepo.findOne({
      where: {
        follower: { id: userId },
        followed: { id: targetId },
      },
      relations: ["follower", "followed"],
    });

    if (!relation) {
      throw new UnauthorizedException("Relation not found");
    }

    const res = await this.relathionRepo.delete(relation);

    return res;
  }

  async getRelation(userId: number) {
    const rel = await this.relathionRepo.find({
      where: [{ followed: { id: userId } }, { follower: { id: userId } }],
      relations: ["followed", "follower"],
    });

    return rel;
  }
}
