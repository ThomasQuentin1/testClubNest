import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ProfilDto } from "./profil.controller";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/User";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class ProfilService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async createProfil(userid: number, body: ProfilDto) {
    const profil = await this.userRepo.findOne({ where: { id: userid } });

    if (!profil) {
      throw new UnauthorizedException();
    }

    profil.description = body.description;
    profil.username = body.username;
    profil.profilePictureUrl = body.mediaUrl;

    const res = await this.userRepo.save(profil);

    return res;
  }

  async getProfil(userid: number) {
    const profil = await this.userRepo.findOne({ where: { id: userid } });

    if (!profil) {
      throw new UnauthorizedException();
    }

    return profil;
  }

  async updateProfil(userid: number, body: ProfilDto) {
    const profil = await this.userRepo.findOne({ where: { id: userid } });

    if (!profil) {
      throw new UnauthorizedException();
    }

    profil.description = body.description;
    profil.username = body.username;
    profil.profilePictureUrl = body.mediaUrl;

    const res = await this.userRepo.save(profil);
    return res;
  }

  async deleteProfil(userid: number) {
    const profil = await this.userRepo.findOne({ where: { id: userid } });

    if (!profil) {
      throw new UnauthorizedException();
    }

    return await this.userRepo.delete(profil);
  }

  async createProfilFromRegister(email: string, password: string) {
    const newUser = new User();

    newUser.email = email;
    newUser.password = await bcrypt.hash(password, 10);
    newUser.followers = [];
    newUser.following = [];
    newUser.description = "";
    newUser.media = [];
    newUser.profilePictureUrl = "";
    newUser.username = "";

    const user = this.userRepo.create(newUser);
    return await this.userRepo.save(user);
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email: email } });

    return user;
  }
}
