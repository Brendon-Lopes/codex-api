import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

describe('UserJwtService', () => {
  let module: TestingModule

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [JwtService],
    }).compile()
  })

  it('should be defined', async () => {
    expect(module).toBeDefined()
  })
})
