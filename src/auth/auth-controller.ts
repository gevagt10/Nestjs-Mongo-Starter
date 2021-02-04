import { Body, Controller, Get, HttpCode, Post, UseFilters, UseGuards } from '@nestjs/common';
import { RegisterForm } from '../validators/register-form';
import { UserProfile } from '../../shared/users/user-profile';
import { UserProfileDbModel } from '../database/models/user-profile.db.model';
import { RegisterError } from '../database/exceptions/auth/register-error';
import { AuthService } from './auth.service';
import { LoginResponse } from '../../shared/users/login-response';
import { RequestUser } from './request-user.decorator';
import { UserAuthGuard } from './user-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }


  @Post('/login')
  @HttpCode(200)
  login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<LoginResponse> {
    return this.authService.authenticate(email, password).then(user => {
      const userToJSON = user.toJSON();
      const token = this.authService.generateToken(userToJSON);

      return {
        token: token,
        user: userToJSON,
      };
    });
  }

  @Post('/register')
  @UseFilters(RegisterError)
  register(@Body() registerForm: RegisterForm): Promise<UserProfile> {
    //Hash the user password and create it afterwards
    return registerForm.getHashedPassword()
      .then(hashedPassword => {
        return UserProfileDbModel.create({
          ...registerForm,
          password: hashedPassword,
        });
      });
  }

  @Get('/profile')
  @UseGuards(UserAuthGuard)
  getProfile(@RequestUser() user: UserProfile): UserProfile {
    return user;
  }
}
