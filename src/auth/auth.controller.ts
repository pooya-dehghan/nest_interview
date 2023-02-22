import { Controller , Post, Req , Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { UserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService : AuthService){}
  @Post('signup')
  async signup(@Body() userDto:UserDto){
    return this.AuthService.signup(userDto)
  }

  @Post('signin')
  async signin(@Body() authdto:AuthDto){
    return this.AuthService.signin(authdto)
  }
}
