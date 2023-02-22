import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator'

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email : string

  @IsString()
  @IsNotEmpty()
  password : string
}

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email : string

  @IsString()
  @IsNotEmpty()
  password : string

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  financialCredit : string

  @IsArray()
  phoneNumbers : string[]

  @IsString()
  @IsUrl()
  profilePicture : string
}
  