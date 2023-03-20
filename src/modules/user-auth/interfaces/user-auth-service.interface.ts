import { UserLoginDto } from '../dto/user-login.dto'
import { User } from '../entities/user.entity'

export abstract class IUserAuthService {
  abstract login(userLoginDto: UserLoginDto): Promise<User>
}
