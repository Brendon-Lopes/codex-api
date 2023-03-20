import { Injectable } from '@nestjs/common'
import { IUserAuthRepository } from '../interfaces/user-auth-repository.interface'
import { User } from '@prisma/client'
import { PrismaService } from '../../../database/prisma/prisma.service'

@Injectable()
export class UserAuthRepository implements IUserAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
}
