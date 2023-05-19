import { UserLoginDto } from '../dto/user-login.dto'
import { User } from '@prisma/client'
import { UserRegisterDto } from 'src/modules/users/dto/user-register.dto'

export abstract class IUserAuthService {
  abstract login(userLoginDto: UserLoginDto): Promise<Omit<User, 'password'>>

  abstract register(
    userRegisterDto: UserRegisterDto,
  ): Promise<Omit<User, 'password'>>
}
