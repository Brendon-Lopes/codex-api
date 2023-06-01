import { BadRequestException, Injectable } from '@nestjs/common'
import { UserLoginDto } from '../dto/user-login.dto'
import { IUserAuthService } from '../interfaces/user-auth-service.interface'
import { User } from '@prisma/client'
import { IUsersService } from 'src/modules/users/interfaces/users-service.interface'
import { UserRegisterDto } from 'src/modules/users/dto/user-register.dto'
import { PasswordHandler } from 'src/utils/password-handler'
import { JwtService } from '@nestjs/jwt'
import { ILoginResponse } from '../interfaces/login-response.interface'
import { IRegisterResponse } from '../interfaces/register-response.interface'

@Injectable()
export class UserAuthService implements IUserAuthService {
  constructor(
    private readonly usersService: IUsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userLoginDto: UserLoginDto): Promise<ILoginResponse> {
    const user = await this.usersService.findUserByEmail(userLoginDto.email)

    if (user == null) {
      throw new BadRequestException('Email or password is incorrect')
    }

    const isPasswordValid = await PasswordHandler.compare(
      userLoginDto.password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new BadRequestException('Email or password is incorrect')
    }

    const accessToken = await this.jwtService.signAsync({
      email: user.email,
      name: user.name,
      sub: user.id,
    })

    delete user.password

    return { ...user, accessToken }
  }

  async register(userRegisterDto: UserRegisterDto): Promise<IRegisterResponse> {
    const hashedPassword = await PasswordHandler.hash(userRegisterDto.password)

    const userRegisterDtoWithHashedPassword = {
      ...userRegisterDto,
      password: hashedPassword,
    }

    const user = await this.usersService.register(
      userRegisterDtoWithHashedPassword,
    )

    const accessToken = await this.jwtService.signAsync({
      email: user.email,
      name: user.name,
      sub: user.id,
    })

    delete user.password

    return { ...user, accessToken }
  }
}
