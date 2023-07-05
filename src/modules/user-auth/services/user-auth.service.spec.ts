import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import { IUsersService } from '../../../modules/users/interfaces/users-service.interface'
import { PasswordHandler } from '../../../utils/password-handler'
import { IUserAuthService } from '../interfaces/user-auth-service.interface'
import { UserAuthService } from './user-auth.service'
import { UserJwtService } from './user-jwt-service'
import { PrismaService } from '../../../database/prisma/prisma.service'
import { BadRequestException } from '@nestjs/common'

describe('UserAuthService', () => {
  let service: IUserAuthService
  let usersService: IUsersService
  let userJwtService: UserJwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: IUserAuthService,
          useClass: UserAuthService,
        },
        {
          provide: IUsersService,
          useClass: jest.fn(() => ({
            findUserByEmail: jest.fn(),
          })),
        },
        {
          provide: UserJwtService,
          useClass: jest.fn(() => ({
            signAsync: jest.fn(),
          })),
        },
        PrismaService,
      ],
    }).compile()

    service = module.get<IUserAuthService>(IUserAuthService)
    usersService = module.get<IUsersService>(IUsersService)
    userJwtService = module.get<UserJwtService>(UserJwtService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('login', () => {
    it('should return the login response', async () => {
      const user: User = {
        id: '1',
        email: 'john@mail.com',
        password: 'hashedPassword',
        name: 'John',
      }

      jest.spyOn(usersService, 'findUserByEmail').mockResolvedValueOnce(user)
      jest.spyOn(PasswordHandler, 'compare').mockResolvedValueOnce(true)
      jest.spyOn(userJwtService, 'signAsync').mockResolvedValueOnce('token')

      const result = await service.login({
        email: user.email,
        password: user.password,
      })

      expect(result).toEqual({
        ...user,
        accessToken: 'token',
      })
    })

    it('should throw an error if the user is not found', async () => {
      jest.spyOn(usersService, 'findUserByEmail').mockResolvedValueOnce(null)
      jest.spyOn(PasswordHandler, 'compare').mockResolvedValueOnce(null)
      jest.spyOn(userJwtService, 'signAsync').mockResolvedValueOnce(null)

      await expect(
        service.login({ email: 'null@mail.com', password: 'null' }),
      ).rejects.toThrowError(BadRequestException)

      expect(PasswordHandler.compare).toHaveBeenCalledTimes(0)
      expect(userJwtService.signAsync).toHaveBeenCalledTimes(0)
    })

    it('should throw an error if the password is incorrect', async () => {
      const user: User = {
        id: '1',
        email: 'john@mail.com',
        password: 'hashedPassword',
        name: 'John',
      }

      jest.spyOn(usersService, 'findUserByEmail').mockResolvedValueOnce(user)
      jest.spyOn(PasswordHandler, 'compare').mockResolvedValueOnce(false)
      jest.spyOn(userJwtService, 'signAsync').mockResolvedValueOnce(null)

      await expect(
        service.login({
          email: user.email,
          password: 'incorrectPassword',
        }),
      ).rejects.toThrowError(BadRequestException)

      expect(usersService.findUserByEmail).toHaveBeenCalledTimes(1)
      expect(PasswordHandler.compare).toHaveBeenCalledTimes(1)
      expect(userJwtService.signAsync).toHaveBeenCalledTimes(0)
    })
  })
})
