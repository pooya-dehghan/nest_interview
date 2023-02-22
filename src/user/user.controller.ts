import { Controller , Post , Param , Body,ParseIntPipe} from '@nestjs/common';
import { UserService } from './user.service';
import {UserEditCredit} from './interface/index'

@Controller('user')
export class UserController {
  constructor(private userService : UserService) {}
  @Post('edit_credit/:id')
  async editUserCredit(@Param('id',ParseIntPipe) id: number, @Body() newFinancialCredit: UserEditCredit) {
    return this.userService.editUserCredit(newFinancialCredit.financialCredit , id)
  }
}
