import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'

@Injectable()
export class UserJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async signAsync(user: User): Promise<string> {
    return this.jwtService.signAsync({
      email: user.email,
      name: user.name,
      sub: user.id,
    })
  }

  async verifyAsync(token: string): Promise<User> {
    return this.jwtService.verifyAsync<User>(token)
  }
}
