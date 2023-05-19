import { BadRequestException, Injectable } from '@nestjs/common'
import { UserLoginDto } from '../dto/user-login.dto'
import { IUserAuthService } from '../interfaces/user-auth-service.interface'
import { User } from '@prisma/client'
import { IUsersService } from 'src/modules/users/interfaces/users-service.interface'
import { UserRegisterDto } from 'src/modules/users/dto/user-register.dto'
import { PasswordHandler } from 'src/utils/password-handler'

@Injectable()
export class UserAuthService implements IUserAuthService {
  constructor(private readonly usersService: IUsersService) {}

  async login(userLoginDto: UserLoginDto): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findUserByEmail(userLoginDto.email)

    if (user == null) {
      throw new BadRequestException('Email or password is incorrect')
    }

    const { password, ...userWithoutPassword } = user

    const isPasswordValid = await PasswordHandler.compare(
      userLoginDto.password,
      password,
    )

    if (!isPasswordValid) {
      throw new BadRequestException('Email or password is incorrect')
    }

    return userWithoutPassword
  }

  async register(
    userRegisterDto: UserRegisterDto,
  ): Promise<Omit<User, 'password'>> {
    const hashedPassword = await PasswordHandler.hash(userRegisterDto.password)

    const userRegisterDtoWithHashedPassword = {
      ...userRegisterDto,
      password: hashedPassword,
    }

    const user = await this.usersService.register(
      userRegisterDtoWithHashedPassword,
    )

    delete user.password

    return user
  }
}
