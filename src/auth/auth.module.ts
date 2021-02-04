import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import config from '../config';
import { AuthController } from './auth-controller';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: config.JWT.SECRET,
      signOptions: config.JWT.OPTIONS,
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {
}
