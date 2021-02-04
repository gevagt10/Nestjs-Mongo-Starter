import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import {MongoError} from "mongodb";

@Catch(MongoError)
export class RegisterError implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    if (exception.code === 11000) {
      response.status(HttpStatus.BAD_REQUEST).json({ message: ['Email already exists'] });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: ['Internal error.'] });
    }
  }
}
