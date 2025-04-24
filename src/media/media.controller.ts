import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  Request,
  Param,
  UseGuards,
} from "@nestjs/common";
import { IsString } from "class-validator";
import { MediaService } from "./media.service";
import { AuthGuard } from "src/auth/auth.guard";

export class MediaDto {
  @IsString()
  title: string;
  @IsString()
  description: string;

  @IsString()
  mediaUrl: string;
}
@Controller("media")
@UseGuards(AuthGuard)
export class MediaController {
  constructor(private MediaService: MediaService) {}

  @UsePipes(new ValidationPipe())
  @Post("")
  async create(@Request() req, @Body() dto: MediaDto) {
    try {
      const data = await this.MediaService.create(req.user.id, dto);
      return { success: true, data };
    } catch (ex) {
      return { success: false, err: ex.message };
    }
  }

  @Get("/all")
  async getAll(@Request() req) {
    try {
      const data = await this.MediaService.getAll(req.user.id);
      return { success: true, data };
    } catch (ex) {
      return { success: false, err: ex.message };
    }
  }


  @Get(":id")
  async get(@Request() req, @Param("id") id: number) {
    try {
      const data = await this.MediaService.get(req.user.id, id);
      return { success: true, data };
    } catch (ex) {
      return { success: false, err: ex.message };
    }
  }


  @Put(":id")
  @UsePipes(new ValidationPipe())
  async update(@Request() req, @Body() dto: MediaDto, @Param("id") id: number) {
    try {
      const data = await this.MediaService.update(req.user.id, dto, id);
      return { success: true, data };
    } catch (ex) {
      return { success: false, err: ex.message };
    }
  }

  @Delete(":id")
  async delete(@Request() req, @Param("id") id: number) {
    try {
      const data = await this.MediaService.delete(req.user.id, id);
      return { success: true, data };
    } catch (ex) {
      return { success: false, err: ex.message };
    }
  }
}
