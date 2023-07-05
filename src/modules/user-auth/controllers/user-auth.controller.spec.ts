import { HttpStatus } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Test, TestingModule } from '@nestjs/testing'
import { Response } from 'express'
import { UserRegisterDto } from 'src/modules/users/dto/user-register.dto'
import { UsersModule } from 'src/modules/users/users.module'
import { UserLoginDto } from '../dto/user-login.dto'
import { ILoginResponse } from '../interfaces/login-response.interface'
import { IUserAuthService } from '../interfaces/user-auth-service.interface'
import { UserAuthService } from '../services/user-auth.service'
import { UserJwtService } from '../services/user-jwt-service'
import { UserAuthController } from './user-auth.controller'

describe('UserAuthController', () => {
  let controller: UserAuthController
  let userAuthService: IUserAuthService
  let statusResponseMock: Response

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          secret: 'secret',
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
        UserJwtService,
      ],
    }).compile()

    controller = module.get<UserAuthController>(UserAuthController)
    userAuthService = module.get<IUserAuthService>(IUserAuthService)

    statusResponseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  const loginResponse: ILoginResponse = {
    id: '1',
    email: 'john@mail.com',
    name: 'John',
    accessToken: 'token',
  }

  describe('login', () => {
    it('should return the login response with jwt token and no password', async () => {
      const bodyMock = {
        email: 'john@mail.com',
        password: 'password',
      } as UserLoginDto

      jest.spyOn(userAuthService, 'login').mockResolvedValue(loginResponse)

      await controller.login(bodyMock, statusResponseMock)

      expect(statusResponseMock.status).toHaveBeenCalledTimes(1)
      expect(statusResponseMock.status).toHaveBeenCalledWith(HttpStatus.OK)

      expect(statusResponseMock.json).toHaveBeenCalledTimes(1)
      expect(statusResponseMock.json).toHaveBeenCalledWith(loginResponse)
    })
  })

  describe('register', () => {
    it('should return the correct response', async () => {
      const bodyMock: UserRegisterDto = {
        email: 'john@mail.com',
        name: 'John',
        password: 'password',
      }

      jest.spyOn(userAuthService, 'register').mockResolvedValue(loginResponse)

      await controller.register(bodyMock, statusResponseMock)

      expect(statusResponseMock.status).toHaveBeenCalledTimes(1)
      expect(statusResponseMock.status).toHaveBeenCalledWith(HttpStatus.CREATED)

      expect(statusResponseMock.json).toHaveBeenCalledTimes(1)
      expect(statusResponseMock.json).toHaveBeenCalledWith(loginResponse)
    })
  })
})
