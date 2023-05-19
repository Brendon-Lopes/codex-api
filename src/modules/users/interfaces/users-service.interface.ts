import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { UserRegisterDto } from '../dto/user-register.dto'

@Injectable()
export abstract class IUsersService {
  abstract findUserByEmail(email: string): Promise<User>
  abstract register(userRegisterDto: UserRegisterDto): Promise<User>
}
