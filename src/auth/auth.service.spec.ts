import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {PrismaService} from '../prisma/prisma.service'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException ,NotAcceptableException } from '@nestjs/common';
import {faker} from '@faker-js/faker';
import { UserDto } from './dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,PrismaService,ConfigService,JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup' , () => {
    it('if user exists throw not acceptable exception' , async () => {
      const signupPayload = {
        email : 'pooyadehghan@yahoo.com',
        password : '123321',
        financialCredit : '100',
        phoneNumbers : ['09152189504' , '09202230930'],
        profilePicture : 'some.com'
      }
      try{
        const signupResult = await service.signup(signupPayload);
      }catch(e){
        expect(e).toBeInstanceOf(NotAcceptableException);
      }
    })
    it('if user is new accept and insert in database', async () => {
      const signupPayload = {
        email : faker.internet.email(), 
        password : faker.random.words(),
        financialCredit : faker.finance.amount(),
        phoneNumbers : [faker.phone.number().toString(),faker.phone.number().toString()],
        profilePicture : 'some.com'
      }
       try{
        const signupResult = await service.signup(signupPayload);
        let expectedRes = signupPayload;
        delete expectedRes.password;  
        expect(signupResult).toMatchObject(expectedRes)
      }catch(e){
        expect(e).toBeInstanceOf(NotAcceptableException);
      }
    })
  })
  describe('signin' , () => {
    it('if user doesnt exist in database throw error not found', async () => {
      const signinUser = {
        email : faker.internet.email(),
        password : faker.random.words(),
      }
      try{
        const signInRes = await service.signin(signinUser);
      }catch(e){
        expect(e).toBeInstanceOf(ForbiddenException);
      }
    })
    it('if user exist in database return the token string from server', async () => {
      const signinUser = {
        email : 'pooyadehghan@yahoo.com',
        password : '123321',
      }
      try{
        const signInRes = await service.signin(signinUser);
        expect(signInRes).toBeDefined();
      }catch(e){
        expect(e).toBeInstanceOf(ForbiddenException);
      }
    })
    it('if user exist and pssword is wrong throw error' , async () => {
      const signUser = {
        email : 'pooyadehghan@yahoo.com',
        password : '321123',
      }
      try{
        const signInRes = await service.signin(signUser);
        expect(signInRes).toBeDefined();
      }catch(e){
        expect(e).toBeInstanceOf(ForbiddenException);
      }
    })
  })
});
