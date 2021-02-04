import { UserProfile } from '../users/user-profile';

export class ILoginResponse {
  user: UserProfile;
  token: string;
}
