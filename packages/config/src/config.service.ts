import { Injectable } from '@nestjs/common';
import { DEFAULT_CONFIG } from './config.defaults';
import { ConfigData } from './config.interface';

@Injectable()
export class ConfigService {
  private config: ConfigData;
  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  public get(): ConfigData {
    return this.config;
  }

  public loadFromEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      port: env.PORT ? parseInt(env.PORT, 10) : DEFAULT_CONFIG.port,
      transactionService: {
        options: {
          host:
            env.TRANSACTION_SERVICE_HOST ??
            DEFAULT_CONFIG.transactionService.options.host,
          port: env.TRANSACTION_SERVICE_PORT
            ? parseInt(env.TRANSACTION_SERVICE_PORT, 10)
            : DEFAULT_CONFIG.transactionService.options.port,
        },
      },
      antiFraudService: {
        transport: DEFAULT_CONFIG.antiFraudService.transport,
        options: {
          host:
            env.ANTIFRAUD_SERVICE_HOST ??
            DEFAULT_CONFIG.antiFraudService.options.host,
          port: env.ANTIFRAUD_SERVICE_PORT
            ? parseInt(env.ANTIFRAUD_SERVICE_PORT, 10)
            : DEFAULT_CONFIG.antiFraudService.options.port,
        },
      },
    };
  }
}
