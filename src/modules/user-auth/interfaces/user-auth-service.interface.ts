import { UserLoginDto } from '../dto/user-login.dto'
import { UserRegisterDto } from 'src/modules/users/dto/user-register.dto'
import { ILoginResponse } from './login-response.interface'
import { IRegisterResponse } from './register-response.interface'

export abstract class IUserAuthService {
  abstract login(userLoginDto: UserLoginDto): Promise<ILoginResponse>

  abstract register(
    userRegisterDto: UserRegisterDto,
  ): Promise<IRegisterResponse>
}
