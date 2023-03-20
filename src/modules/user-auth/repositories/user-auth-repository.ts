import { Injectable } from '@nestjs/common'
import { User } from '../entities/user.entity'
import { IUserAuthRepository } from '../interfaces/user-auth-repository.interface'

@Injectable()
export class UserAuthRepository implements IUserAuthRepository {
  async findUserByEmail(email: string): Promise<User> {
    const user = new User()
    user.email = email
    return user
  }
}
