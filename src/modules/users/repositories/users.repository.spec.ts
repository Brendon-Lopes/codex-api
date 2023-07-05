import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import { PrismaService } from '../../../database/prisma/prisma.service'
import { IUsersRepository } from '../interfaces/users-repository.interface'
import { UsersRepository } from './users.repository'

describe('UsersRepository', () => {
  let usersRepository: IUsersRepository
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          provide: IUsersRepository,
          useClass: UsersRepository,
        },
      ],
    }).compile()

    usersRepository = module.get<IUsersRepository>(IUsersRepository)
    prisma = module.get<PrismaService>(PrismaService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(usersRepository).toBeDefined()
  })

  describe('findUserByEmail', () => {
    it('should return the user', async () => {
      const user: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@mail.com',
        password: '123456',
      }

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user)

      const result = await usersRepository.findUserByEmail(user.email)

      expect(result).toBe(user)
    })
  })

  describe('createUser', () => {
    it('should return the created user', async () => {
      const user: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@mail.com',
        password: '123456',
      }

      jest.spyOn(prisma.user, 'create').mockResolvedValue(user)

      const result = await usersRepository.createUser(user)

      expect(result).toBe(user)
    })
  })
})
