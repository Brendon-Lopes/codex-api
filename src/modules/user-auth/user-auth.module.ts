import { Module } from '@nestjs/common'
import { UserAuthController } from './controllers/user-auth.controller'
import { IUserAuthRepository } from './interfaces/user-auth-repository.interface'
import { IUserAuthService } from './interfaces/user-auth-service.interface'
import { UserAuthRepository } from './repositories/user-auth-repository'
import { UserAuthService } from './services/user-auth.service'

@Module({
  controllers: [UserAuthController],
  providers: [
    {
      provide: IUserAuthService,
      useClass: UserAuthService,
    },
    {
      provide: IUserAuthRepository,
      useClass: UserAuthRepository,
    },
  ],
})
export class UserAuthModule {}
