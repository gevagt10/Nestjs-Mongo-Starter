import { IUserProfile } from '../interfaces/i-user-profile.';


export class UserProfile implements IUserProfile {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  constructor(userProfile?: UserProfile) {
    if (!userProfile) return;
    if (userProfile._id) this._id = userProfile._id
    this.email = userProfile.email;
    this.firstName = userProfile.firstName;
    this.lastName = userProfile.lastName;
    this.password = userProfile.password;
  }
}
