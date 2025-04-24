import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ProfilService } from "../profil/profil.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";



@Injectable()
export class AuthService {
  constructor(
    private usersService: ProfilService,
    private jwtService: JwtService
  ) {}

  async login(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    console.log(process.env.JWT_SECRET)
    const payload = { id: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(email: string, password: string) {
    return this.usersService.createProfilFromRegister(email, password);
  }
}
