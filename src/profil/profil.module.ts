import { Module } from "@nestjs/common";
import { ProfilService } from "./profil.service";
import { ProfilController } from "./profil.controller";
import { User } from "src/entities/User";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ProfilService],
  controllers: [ProfilController],
})
export class ProfilModule {}
