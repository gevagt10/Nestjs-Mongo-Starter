import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AppsValidationPipe } from './pipes/apps-validation-pipe';
import { UserAuthGuard } from '../auth/user-auth-guard';

@Controller('app')
export class ApplicationController {
  @Post('/add')
  @UsePipes(AppsValidationPipe)
  @UseGuards(UserAuthGuard)
  async add(@Body() apps: any[]) {
    // Create your logic / call db queries
    return apps;
  }
}
