import { User } from '@prisma/client'
import { UserRegisterDto } from '../dto/user-register.dto'

export abstract class IUserAuthRepository {
  abstract findUserByEmail(email: string): Promise<User>
  abstract createUser(userRegisterDto: UserRegisterDto): Promise<User>
}
