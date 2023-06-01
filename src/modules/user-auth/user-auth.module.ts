import 'dotenv/config'
import { Module } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { UsersModule } from '../users/users.module'
import { UserAuthController } from './controllers/user-auth.controller'
import { IUserAuthRepository } from './interfaces/user-auth-repository.interface'
import { IUserAuthService } from './interfaces/user-auth-service.interface'
import { UserAuthRepository } from './repositories/user-auth-repository'
import { UserAuthService } from './services/user-auth.service'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserJwtService } from './services/user-jwt-service'

const JWT_SECRET = process.env.JWT_SECRET

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d', algorithm: 'HS512' },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
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
    UserJwtService,
    PrismaService,
  ],
})
export class UserAuthModule {}
