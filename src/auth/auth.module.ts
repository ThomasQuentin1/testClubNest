import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ProfilModule } from "../profil/profil.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/User";
import { ProfilService } from "src/profil/profil.service";


@Module({
  imports: [
    ProfilModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET|| "supersecretkey",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [AuthService, ProfilService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
