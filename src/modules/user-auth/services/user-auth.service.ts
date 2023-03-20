import { Injectable } from '@nestjs/common'
import { UserLoginDto } from '../dto/user-login.dto'
import { User } from '../entities/user.entity'
import { IUserAuthRepository } from '../interfaces/user-auth-repository.interface'
import { IUserAuthService } from '../interfaces/user-auth-service.interface'

@Injectable()
export class UserAuthService implements IUserAuthService {
  constructor(private readonly userAuthRepository: IUserAuthRepository) {}

  async login(userLoginDto: UserLoginDto): Promise<User> {
    const user = await this.userAuthRepository.findUserByEmail(
      userLoginDto.email,
    )

    return user
  }
}
