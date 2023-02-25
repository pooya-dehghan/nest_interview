import { Injectable , ForbiddenException ,NotAcceptableException ,NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService : PrismaService){}
  async editUserCredit(newFinancialCredit: string , id : number) {
    let FinancialCreditConvertedToEng = this.convertToEngNumb(newFinancialCredit);
    let isnum = this.isNumeric(FinancialCreditConvertedToEng);
    if(!isnum){
      throw new NotAcceptableException('امکان مقدار دهی جدید وجود ندارد لطفا از اعداد استفاده کنید.')
      return
    }
    let user =  await this.prismaService.user.findUnique({
      where : {
        id : Number(id)
      }
    })
    if(!user){
      throw new NotFoundException('کاربر با این آیدی وجود ندارد')
    }else{
      const finanacialCreditNum = Number(FinancialCreditConvertedToEng);
      const updateUser = await this.prismaService.user.update({
        where: {
          id: Number(id),
        },
        data: {
          financialCredit: finanacialCreditNum + user.financialCredit ,
        },
      })
      return {
        success: true,
        user  : updateUser
      }
    }
  }

  convertToEngNumb(str : string) : string {
    var persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    var arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
      if(typeof str === 'string')
      {
        for(var i=0; i<10; i++)
        {
          str = str.replace(persianNumbers[i], i.toString()).replace(arabicNumbers[i], i.toString());
        }
      }
      return str;
  }

  isNumeric(str : string) : boolean {
    if (typeof str != "string") console.log(str) // we only process strings!  
    return !isNaN(Number(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
          !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }
}
