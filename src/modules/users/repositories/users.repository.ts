import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { UserRegisterDto } from '../dto/user-register.dto'
import { IUsersRepository } from '../interfaces/users-repository.interface'

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async createUser(userRegisterDto: UserRegisterDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        email: userRegisterDto.email,
        password: userRegisterDto.password,
        name: userRegisterDto.name,
      },
    })
  }
}
