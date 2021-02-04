import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DatabaseConnectionManager } from './database-connection-manager';
import * as mongoose from 'mongoose';
import { IDatabaseModuleConfig } from './interfaces/i-database-module-config';
import { sleepAsync } from '../misc/utils';
import { IDatabaseService } from './interfaces/i-database.service';
import { RETRY_CONNECTION_COUNT, RETRY_CONNECTION_TIMEOUT } from './database-constants';


/**
 * Responsible of connecting and closing the mongo database connection, it will reconnect a few times
 * if connection cannot be established on the first time.
 */
@Injectable()
export class DatabaseService
  implements IDatabaseService, OnModuleInit, OnModuleDestroy {
  connectionManager: DatabaseConnectionManager = DatabaseConnectionManager.instance;
  connection: mongoose.Connection;

  constructor(
    @Inject('DATABASE_MODULE_CONFIG')
    private readonly config: IDatabaseModuleConfig,
  ) {
  }

  async close(): Promise<void> {
    const db = mongoose.connection;
    if (db) await db.close();
  }

  async connect(): Promise<void> {
    this.connection = await this.connectionManager.connectDatabase(
      this.config.uri,
    );
  }

  async onModuleInit(): Promise<void> {
    await this.connectWithRetry(this.config.retryCount || RETRY_CONNECTION_COUNT);
  }

  protected async connectWithRetry(retryCount: number): Promise<void> {
    for (let i = 0; i < retryCount; i++) {
      try {
        await this.connect();
        return;
      } catch (error) {
        Logger.log(`Retrying to connect database in 5 seconds...`);
        await sleepAsync(RETRY_CONNECTION_TIMEOUT);
      }
    }
  }


  async onModuleDestroy(): Promise<void> {
    await this.close();
  }
}
