import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { IUserProfileDbModel, UserProfileDbModel } from '../database/models/user-profile.db.model';
import { Query } from 'mongoose';
import { UserProfile } from '../../shared/users/user-profile';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {
  }

  authenticate(email: string, password: string): Promise<IUserProfileDbModel> {
    const errorMsg = `Email or password are invalid!`;
    return UserProfileDbModel
      .findOne({ email })
      .select('+password').then(user => {
        // If this user does not exist, throw the same error for security reasons
        if (!user)
          throw new UnauthorizedException(errorMsg);

        return bcrypt.compare(password, user.password).then(match => {
          // The password do not match the one saved on the database
          if (!match)
            throw new UnauthorizedException(errorMsg);
          return user;
        });
      });
  }

  generateToken(user: UserProfile): string {
    return this.jwtService.sign(JSON.stringify(user));
  }

  decodeToken(token: string): UserProfile {
    return this.jwtService.verify(token) as UserProfile;
  }

  getUserByEmailQuery(email: string): Query<IUserProfileDbModel, IUserProfileDbModel> {
    return UserProfileDbModel.findOne({ email });
  }

}
