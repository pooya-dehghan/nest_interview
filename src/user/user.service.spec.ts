import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { NotAcceptableException } from '@nestjs/common';
import {faker} from '@faker-js/faker';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,PrismaService,ConfigService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('edit user credit', () => { 
    it('if we do not pass a convertable string for new finance credit throw error' , async () => {
      const editPayload = {
        newFinancialCredit : '279-8',
        id : 4
      };
      try{
        const editRes = await service.editUserCredit(editPayload.newFinancialCredit, editPayload.id);
      }catch(e){
        expect(e).toBeInstanceOf(NotAcceptableException);
      }
    })
    it('if id did not exist throw error not found' , async () => {
      const editPayload = {
        newFinancialCredit : '279-8',
        id : faker.datatype.number()
      }
      try{
        const editRes = await service.editUserCredit(editPayload.newFinancialCredit, editPayload.id);
      }catch(e){
        expect(e).toBeInstanceOf(NotAcceptableException);
      }
    })
    it('if id was correct and new amount was convertable get success true' , async () => {
      const editPayload = {
        newFinancialCredit : '20',
        id : 4
      }
      try{
        const editRes = await service.editUserCredit(editPayload.newFinancialCredit, editPayload.id);
        expect(editRes).toMatchObject({success : true});
      }catch(e){
        expect(e).toBeInstanceOf(NotAcceptableException);
      }
    })
  })
});
