import { Module } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { IUsersRepository } from './interfaces/users-repository.interface'
import { IUsersService } from './interfaces/users-service.interface'
import { UsersRepository } from './repositories/users.repository'
import { UsersService } from './services/users.service'

@Module({
  providers: [
    {
      provide: IUsersService,
      useClass: UsersService,
    },
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
    PrismaService,
  ],
  exports: [IUsersService],
})
export class UsersModule {}
