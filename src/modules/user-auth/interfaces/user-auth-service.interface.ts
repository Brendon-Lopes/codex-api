import { UserLoginDto } from '../dto/user-login.dto'
import { User } from '@prisma/client'
import { UserRegisterDto } from '../dto/user-register.dto'

export abstract class IUserAuthService {
  abstract login(userLoginDto: UserLoginDto): Promise<User>
  abstract register(userRegisterDto: UserRegisterDto): Promise<User>
}
