import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { IDatabaseModuleConfig } from './interfaces/i-database-module-config';
import { DATABASE_MODULE_CONFIG } from './database-constants';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {
  static forRoot(iDatabaseModuleConfig: IDatabaseModuleConfig): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [{provide: DATABASE_MODULE_CONFIG, useValue: iDatabaseModuleConfig }],
    };
  }
}
