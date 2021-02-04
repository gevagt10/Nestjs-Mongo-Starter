import { Injectable } from '@nestjs/common';
import { AppConfig } from '../models/app-config';
import config from '../config';

@Injectable()
export class ConfigService {
  getConfig(): AppConfig {
    return config;
  }
}
