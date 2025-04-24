import { Module } from "@nestjs/common";
import { UserRelationshipService } from "./user-relationship.service";
import { UserRelationshipController } from "./user-relationship.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/User";
import { UserRelationship } from "src/entities/UserRelathionship";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([UserRelationship]),
  ],
  providers: [UserRelationshipService],
  controllers: [UserRelationshipController],
})
export class UserRelationshipModule {}
