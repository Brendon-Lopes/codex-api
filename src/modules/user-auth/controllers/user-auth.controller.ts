import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { UserLoginDto } from '../dto/user-login.dto'
import { IUserAuthService } from '../interfaces/user-auth-service.interface'
import { Response } from 'express'
import { UserRegisterDto } from '../dto/user-register.dto'

@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: IUserAuthService) {}

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto, @Res() res: Response) {
    const user = await this.userAuthService.login(userLoginDto)
    return res.status(HttpStatus.OK).json(user)
  }

  @Post('register')
  async register(
    @Body() userRegisterDto: UserRegisterDto,
    @Res() res: Response,
  ) {
    const user = await this.userAuthService.register(userRegisterDto)
    return res.status(HttpStatus.CREATED).json(user)
  }
}
