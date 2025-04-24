import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  Get,
  Put,
  Delete,
} from "@nestjs/common";
import { IsString } from "class-validator";
import { AuthGuard } from "src/auth/auth.guard";
import { ProfilService } from "./profil.service";

export class ProfilDto {
  @IsString()
  description: string;
  @IsString()
  mediaUrl: string;
  @IsString()
  username: string;
}

@Controller("profil")
@UseGuards(AuthGuard)
export class ProfilController {
  constructor(private profilService: ProfilService) {}

  @UsePipes(new ValidationPipe())
  @Post("")
  async create(@Request() req, @Body() dto: ProfilDto) {
    try {
      const profil = await this.profilService.createProfil(req.user.id, dto);
      return { success: true, data: profil };
    } catch (ex) {
      return { success: false, err: ex.message };
    }
  }

  @Get()
  async get(@Request() req) {
    try {
      const profil = await this.profilService.getProfil(req.user.id);
      return { success: true, data: profil };
    } catch (ex) {
      return { success: false, err: ex.message };
    }
  }

  @Put()
  @UsePipes(new ValidationPipe())
  async update(@Request() req, @Body() dto: ProfilDto) {
    try {
      const profil = await this.profilService.updateProfil(req.user.id, dto);
      return { success: true, data: profil };
    } catch (ex) {
      return { success: false, err: ex.message };
    }
  }

  @Delete()
  async delete(@Request() req) {
    try {
      const profil = await this.profilService.deleteProfil(req.user.id);
      return { success: true, data: profil };
    } catch (ex) {
      return { success: false, err: ex.message };
    }
  }
}
