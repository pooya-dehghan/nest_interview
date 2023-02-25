import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import {UserService} from './user.service';
import {PrismaService} from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers:[UserService,PrismaService,ConfigService],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
