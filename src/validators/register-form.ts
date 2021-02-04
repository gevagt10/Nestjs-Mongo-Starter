import { IsEmail, IsString, MinLength } from 'class-validator';
import { getHashedPassword } from '../misc/utils';


export class RegisterForm {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  firstName: string;

  @IsString()
  @MinLength(1)
  lastName: string;

  @IsString()
  @MinLength(2)
  password: string;

  getHashedPassword(): Promise<string> {
    return getHashedPassword(this.password);
  }
}
