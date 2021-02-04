import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import config from '../config';
import { Injectable } from '@nestjs/common';
import { UserProfile } from '../../shared/users/user-profile';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JWT.SECRET,
    });
  }

  validate(payload: UserProfile): Promise<UserProfile> {
    return this.authService.getUserByEmailQuery(payload.email).exec();
  }
}
