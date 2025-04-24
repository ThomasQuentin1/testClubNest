import { Injectable, UnauthorizedException } from "@nestjs/common";
import { MediaDto } from "./media.controller";
import { InjectRepository } from "@nestjs/typeorm";
import { Media } from "src/entities/Media";
import { Repository } from "typeorm";
import { User } from "src/entities/User";

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Media)
    private MediaRepo: Repository<Media>
  ) {}

  async create(userid: number, body: MediaDto) {
    const profil = await this.userRepo.findOne({ where: { id: userid } });

    if (!profil) {
      throw new UnauthorizedException();
    }
    const newMedia = new Media();
    newMedia.description = body.description;
    newMedia.title = body.title;
    newMedia.mediaUrl = body.mediaUrl;
    newMedia.user = profil;

    const res = await this.MediaRepo.save(newMedia);

    return res;
  }

  async get(userid: number, mediaId: number) {
    const media = await this.MediaRepo.findOne({
      where: { id: mediaId },
      relations: ["user"],
    });

    if (!media) {
      throw new UnauthorizedException();
    }

    if (media.user.id !== userid) {
      throw new UnauthorizedException();
    }

    return media;
  }

  async getAll(userid: number) {
    const user = await this.userRepo.findOne({
      where: { id: userid },
      relations: ["media"],
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user.media;
  }

  async update(userid: number, body: MediaDto, mediaId: number) {
    const media = await this.MediaRepo.findOne({
      where: { id: mediaId },
      relations: ["user"],
    });

    if (!media) {
      throw new UnauthorizedException();
    }
    if (media.user.id !== userid) {
      throw new UnauthorizedException();
    }
    media.description = body.description;
    media.title = body.title;
    media.mediaUrl = body.mediaUrl;

    const res = await this.MediaRepo.save(media);

    return res;
  }

  async delete(userid: number, mediaId: number) {
    const media = await this.MediaRepo.findOne({
      where: { id: mediaId },
      relations: ["user"],
    });

    if (!media) {
      throw new UnauthorizedException();
    }
    if (media.user.id !== userid) {
      throw new UnauthorizedException();
    }

    const res = await this.MediaRepo.delete(media);
    return res;
  }
}
