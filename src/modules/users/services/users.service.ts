import { BadRequestException, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { UserRegisterDto } from '../dto/user-register.dto'
import { IUsersRepository } from '../interfaces/users-repository.interface'
import { IUsersService } from '../interfaces/users-service.interface'

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findUserByEmail(email)

    if (user == null) {
      throw new BadRequestException('Email or password is incorrect')
    }

    return user
  }

  async register(userRegisterDto: UserRegisterDto): Promise<User> {
    const user = await this.usersRepository.findUserByEmail(
      userRegisterDto.email,
    )

    if (user != null) {
      throw new BadRequestException('Email already registered')
    }

    return this.usersRepository.createUser(userRegisterDto)
  }
}
