import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async generateToken(user) {
    return this.jwt.signAsync({
      id: user.id,
      name: user.name,
      roles: user.roles
    })
  }
}
