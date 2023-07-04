import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../../database/prisma/prisma.service'
import { IUsersRepository } from '../interfaces/users-repository.interface'
import { IUsersService } from '../interfaces/users-service.interface'
import { UsersRepository } from '../repositories/users.repository'
import { UsersService } from './users.service'
import { User } from '@prisma/client'
import { BadRequestException, ConflictException } from '@nestjs/common'

describe('UsersService', () => {
  let usersService: IUsersService
  let usersRepository: IUsersRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile()

    usersService = module.get<IUsersService>(IUsersService)
    usersRepository = module.get<IUsersRepository>(IUsersRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(usersService).toBeDefined()
  })

  describe('findUserByEmail', () => {
    it('should return the user', async () => {
      const user: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@mail.com',
        password: '123456',
      }

      jest.spyOn(usersRepository, 'findUserByEmail').mockResolvedValue(user)

      expect(await usersService.findUserByEmail('john@mail.com')).toBe(user)
    })
  })

  it('should throw an error if the user is not found', async () => {
    jest.spyOn(usersRepository, 'findUserByEmail').mockResolvedValue(null)

    expect(usersService.findUserByEmail('john@mail.com')).rejects.toThrowError(
      BadRequestException,
    )
  })

  describe('register', () => {
    it('should return the created user', async () => {
      const user: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@mail.com',
        password: '123456',
      }

      jest.spyOn(usersRepository, 'findUserByEmail').mockResolvedValue(null)
      jest.spyOn(usersRepository, 'createUser').mockResolvedValue(user)

      const result = await usersService.register({
        name: 'John Doe',
        email: 'john@mail.com',
        password: '123456',
      })

      expect(result).toBe(user)
    })

    it('should throw an error if the user already exists', async () => {
      const user: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@mail.com',
        password: '123456',
      }

      jest.spyOn(usersRepository, 'findUserByEmail').mockResolvedValue(user)
      jest.spyOn(usersRepository, 'createUser').mockImplementation()

      expect(usersService.register(user)).rejects.toThrowError(
        ConflictException,
      )
    })
  })
})
