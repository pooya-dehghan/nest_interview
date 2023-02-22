import { Injectable , ForbiddenException } from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,  
    private config: ConfigService,
  ) {}
    async signup(userDto : UserDto ): Promise<User> {
      // gotta search for user and if its email exists
      const user = await this.prisma.user.findMany({
        where : {
          email : userDto.email
        }
      }) 
      //if was there message with alerady exists
      if(user.length) {
        throw new ForbiddenException('کاربر با این ایمیل وجود دارد.')
      }
      else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userDto.password, salt);
        
        const newUser = await this.prisma.user.create({
          data : {
            email : userDto.email,
            password : hashedPassword,
            financialCredit : userDto.financialCredit,
            phoneNumbers : userDto.phoneNumbers,
            profilePicture : userDto.profilePicture
          },
        })
        delete newUser.password
        return newUser
      }
    }

    async signin(authDto : AuthDto){
      const user = await this.prisma.user.findUnique({
        where : {
          email : authDto.email
        } 
      })
      
      if(!user) {
        throw new ForbiddenException('کاربر با این ایمیل وجود ندارد')
      }

      const passMatches = await bcrypt.compare(authDto.password , user.password);
      if(passMatches){
        const payload = {
          userId : user.id,
          email : user.email
        }
        const secret = this.config.get('jwt_secret');
        const token = this.jwt.signAsync(payload , {
          expiresIn: '15m',
          secret : secret
        })
        return token
      }
    } 
}
