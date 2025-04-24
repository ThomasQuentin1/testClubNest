import { Module } from "@nestjs/common";
import { FeedService } from "./feed.service";
import { FeedController } from "./feed.controller";
import { UserRelationship } from "src/entities/UserRelathionship";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Media } from "src/entities/Media";
import { User } from "src/entities/User";

@Module({
  imports: [TypeOrmModule.forFeature([Media, UserRelationship, User])],
  providers: [FeedService],
  controllers: [FeedController],
})
export class FeedModule {}
