import { ArgumentMetadata, Injectable, Logger, PipeTransform, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AppsValidationPipe implements PipeTransform {
  async transform(apps: any[], argumentMetadata: ArgumentMetadata) {
    const checkedApps: any[] = [];
    for (const app of apps) {
      checkedApps.push(app);
    }
    return checkedApps;
  }



}
