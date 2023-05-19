import { Module } from '@nestjs/common'
import { UserAuthModule } from './modules/user-auth/user-auth.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [UserAuthModule, UsersModule],
  providers: [],
})
export class AppModule {}
