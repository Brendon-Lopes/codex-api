import { BadRequestException, Injectable } from '@nestjs/common'
import { UserLoginDto } from '../dto/user-login.dto'
import { IUserAuthService } from '../interfaces/user-auth-service.interface'
import { IUsersService } from 'src/modules/users/interfaces/users-service.interface'
import { UserRegisterDto } from 'src/modules/users/dto/user-register.dto'
import { PasswordHandler } from 'src/utils/password-handler'
import { ILoginResponse } from '../interfaces/login-response.interface'
import { IRegisterResponse } from '../interfaces/register-response.interface'
import { UserJwtService } from './user-jwt-service'

@Injectable()
export class UserAuthService implements IUserAuthService {
  constructor(
    private readonly usersService: IUsersService,
    private readonly userJwtService: UserJwtService,
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

    const accessToken = await this.userJwtService.signAsync(user)

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

    const accessToken = await this.userJwtService.signAsync(user)

    delete user.password

    return { ...user, accessToken }
  }
}
