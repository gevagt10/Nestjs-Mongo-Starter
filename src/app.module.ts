import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigManagerModule } from './config-manager/config-manager.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ApplicationModule } from './application/application.module';
import config from './config';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    ConfigManagerModule,
    DatabaseModule.forRoot({uri: config.DB_URI}),
    ApplicationModule,
  ],
  providers: [AppService],
})
export class AppModule {}
