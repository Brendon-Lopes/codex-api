import { Module } from '@nestjs/common'
import { UserAuthModule } from './modules/user-auth/user-auth.module'

@Module({
  imports: [UserAuthModule],
})
export class AppModule {}
