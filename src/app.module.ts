import { Module } from '@nestjs/common'
import { APP_GUARD, Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { UserAuthGuard } from './modules/user-auth/guards/user-auth.guard'
import { UserJwtService } from './modules/user-auth/services/user-jwt-service'
import { UserAuthModule } from './modules/user-auth/user-auth.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [UserAuthModule, UsersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UserAuthGuard,
    },
    JwtService,
    UserJwtService,
    Reflector,
  ],
})
export class AppModule {}
