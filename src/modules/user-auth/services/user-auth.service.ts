import { BadRequestException, Injectable } from '@nestjs/common'
import { UserLoginDto } from '../dto/user-login.dto'
import { IUserAuthRepository } from '../interfaces/user-auth-repository.interface'
import { IUserAuthService } from '../interfaces/user-auth-service.interface'
import { User } from '@prisma/client'
import { UserRegisterDto } from '../dto/user-register.dto'

@Injectable()
export class UserAuthService implements IUserAuthService {
  constructor(private readonly userAuthRepository: IUserAuthRepository) {}

  async login(userLoginDto: UserLoginDto): Promise<User> {
    const user = await this.userAuthRepository.findUserByEmail(
      userLoginDto.email,
    )

    if (user == null) {
      throw new BadRequestException('Email or password is incorrect')
    }

    return user
  }

  async register(userRegisterDto: UserRegisterDto): Promise<User> {
    const user = await this.userAuthRepository.findUserByEmail(
      userRegisterDto.email,
    )

    if (user != null) {
      throw new BadRequestException('Email already registered')
    }

    return this.userAuthRepository.createUser(userRegisterDto)
  }
}
