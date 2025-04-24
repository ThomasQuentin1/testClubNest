import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { FeedService } from "./feed.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("feed")
@UseGuards(AuthGuard)
export class FeedController {
  constructor(private FeedService: FeedService) {}

  @Get()
  async get(@Request() req) {
    try {
      const data = await this.FeedService.getFeed(req.user.id);
      return { success: true, data };
    } catch (ex) {
      return { success: false, err: ex.message };
    }
  }
  @Get("old")
  async getOld(@Request() req) {
    try {
      const data = await this.FeedService.getOldFeed(req.user.id);
      return { success: true, data };
    } catch (ex) {
      return { success: false, err: ex.message };
    }
  }

}
