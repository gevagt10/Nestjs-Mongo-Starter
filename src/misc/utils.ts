import { promisify } from 'util';
import * as bcrypt from 'bcrypt';

export const sleepAsync = async (millis: number): Promise<void> => {
  await promisify(setTimeout)(millis);
};

export const getHashedPassword = (password: string): Promise<string> => {
  return bcrypt.genSalt().then(salt => {
    return bcrypt.hash(password, salt).then(hash => {
      return hash;
    });
  });
};
