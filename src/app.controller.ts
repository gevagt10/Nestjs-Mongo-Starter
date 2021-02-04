import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from './config-manager/config.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService,
              private configService: ConfigService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
