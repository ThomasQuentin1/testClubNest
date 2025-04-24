import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Media } from "../entities/Media";
import { UserRelationship } from "../entities/UserRelathionship";
import { User } from "src/entities/User";

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>,
    @InjectRepository(UserRelationship)
    private readonly userRelationshipRepo: Repository<UserRelationship>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async getOldFeed(
    userId: number,
    page: number = 1,
    limit: number = 10
  ): Promise<Media[]> {
    const offset = (page - 1) * limit;

    const relationships = await this.userRelationshipRepo.find({
      where: { follower: { id: userId } },
      relations: ["followed"],
    });

    const followedUserIds = relationships.map((rel) => rel.followed.id);

    if (followedUserIds.length === 0) {
      return [];
    }

    const feed = await this.mediaRepo.find({
      where: {
        user: { id: In(followedUserIds) },
      },
      order: { id: "DESC" },
      skip: offset,
      take: limit,
      relations: ["user"],
    });

    return feed;
  }

  async getFeed(
    userId: number,
    page: number = 1,
    limit: number = 10
  ): Promise<Media[]> {
    const offset = (page - 1) * limit;

    const relationships = await this.userRelationshipRepo.find({
      where: { follower: { id: userId } },
      relations: ["followed"],
    });

    const followedUserIds = relationships.map((rel) => rel.followed.id);

    if (followedUserIds.length === 0) {
      return [];
    }

    // Récupérer les médias des utilisateurs suivis qui n'ont pas encore été vus par l'utilisateur
    const feed = await this.mediaRepo
      .createQueryBuilder("media")
      .leftJoinAndSelect("media.user", "user")
      .leftJoinAndSelect("media.viewedBy", "viewedBy")
      .where("user.id IN (:...followedUserIds)", { followedUserIds })
      .andWhere("viewedBy.id IS NULL OR viewedBy.id != :userId", { userId })
      .orderBy("media.id", "DESC")
      .skip(offset)
      .take(limit)
      .getMany();

    const mediaIds = feed.map((media) => media.id);
    await this.markAsViewed(userId, mediaIds);

    return feed;
  }
  async markAsViewed(userId: number, mediaIds: number[]): Promise<void> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ["viewedMedia"],
    });
    const media = await this.mediaRepo.find({
      where: { id: In(mediaIds) },
    });

    for (const m of media) {
      if (!user.viewedMedia.some((vm) => vm.id === m.id)) {
        user.viewedMedia.push(m);
      }
    }
    await this.userRepo.save(user);
  }
}
