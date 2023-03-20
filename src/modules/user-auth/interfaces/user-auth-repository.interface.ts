import { User } from '../entities/user.entity'

export abstract class IUserAuthRepository {
  abstract findUserByEmail(email: string): Promise<User>
}
