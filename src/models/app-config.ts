import * as jwt from 'jsonwebtoken';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export interface AppConfig {
  ENVIRONMENT: string;
  DB_URI: string;
  CLIENT_URL: string;
  JWT: {
    SECRET: string;
    OPTIONS: jwt.SignOptions;
    VERIFY_OPTIONS: jwt.VerifyOptions;
  };
  SSL_CERTIFICATE: {
    KEY: string;
    CERT: string;
    CA: string;
  };
  CORS_OPTIONS: CorsOptions;
  LOGS_DIR: string;
  LOG_LEVEL: 'debug' | 'info';
  DEBUG_MODE: boolean;
}
