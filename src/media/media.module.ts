import { Module } from "@nestjs/common";
import { MediaService } from "./media.service";
import { MediaController } from "./media.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Media } from "src/entities/Media";
import { User } from "src/entities/User";

@Module({
  imports: [TypeOrmModule.forFeature([Media, User])],
  providers: [MediaService],
  controllers: [MediaController],
})
export class MediaModule {}
