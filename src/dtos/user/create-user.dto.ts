import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  cityAndState: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
  
  @IsString()
  @IsNotEmpty()
  fname: string;
  
  @IsString()
  @IsNotEmpty()
  lname: string;

  @IsNotEmpty()
  @IsString()
  role: string;

}
