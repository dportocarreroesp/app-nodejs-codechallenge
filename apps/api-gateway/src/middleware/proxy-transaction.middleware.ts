import { ConfigService } from '@codechallenge/config';
import { Inject, NestMiddleware } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'http';
import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';

export class ProxyTransactionMiddleware implements NestMiddleware {
  private proxy: RequestHandler<
    any,
    ServerResponse<IncomingMessage>,
    (err?: any) => void
  >;
  constructor(
    @Inject('CONFIG_SERVICE') private readonly configSvc: ConfigService,
  ) {
    this.configSvc.loadFromEnv();
    const transactionConfig = configSvc.get().transactionService;

    this.proxy = createProxyMiddleware({
      target: `http://${transactionConfig.options.host}:${transactionConfig.options.port}/`,
      pathRewrite: {
        '/api/v1/transactions/': '/',
      },
      secure: false,
      on: {
        proxyReq: (_, req: any) => {
          console.info(
            `[NestMiddleware]: Proxying ${req.method} request originally made to '${req.originalUrl}'...`,
          );
        },
      },
    });
  }

  use(req: any, res: any, next: (error?: any) => void) {
    this.proxy(req, res, next);
  }
}
