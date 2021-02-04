import { ILoginResponse } from '../interfaces/i-login-response';
import { UserProfile } from './user-profile';


export class LoginResponse implements ILoginResponse {
  token: string;
  user: UserProfile = new UserProfile();
  constructor(loginResponse?: LoginResponse) {
    if (!loginResponse) return;
    this.token = loginResponse.token;
    this.user = new UserProfile(loginResponse.user);
  }


}
