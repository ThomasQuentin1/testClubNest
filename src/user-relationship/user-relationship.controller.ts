import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { UserRelationshipService } from "./user-relationship.service";
import { AuthGuard } from "src/auth/auth.guard";

@UseGuards(AuthGuard)
@Controller("user-relationship")
export class UserRelationshipController {
  constructor(private relationshipService: UserRelationshipService) {}

  @Post("follow/:id")
  async follow(@Request() req, @Param("id") id: number) {
    try {
      const profil = await this.relationshipService.follow(req.user.id, id);
      return { success: true, data: profil };
    } catch (ex) {
      return { success: false, err: ex.message };
    }
  }
  @Delete("unfollow/:id")
  async unfollow(@Request() req, @Param("id") id: number) {
    try {
      const profil = await this.relationshipService.unfollow(req.user.id, id);
      return { success: true, data: profil };
    } catch (ex) {
      return { success: false, err: ex.message };
    }
  }

  @Get("")
  async getAll(@Request() req) {
    try {
      const profil = await this.relationshipService.getRelation(req.user.id)
      return { success: true, data: profil };
    } catch (ex) {
      return { success: false, err: ex.message };
    }
  }
}
