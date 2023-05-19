import { User } from '@prisma/client'

export abstract class IUsersRepository {
  abstract findUserByEmail(email: string): Promise<User>
  abstract createUser(userRegisterDto: any): Promise<User>
}
