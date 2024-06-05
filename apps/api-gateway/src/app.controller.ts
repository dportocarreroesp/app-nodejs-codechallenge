import { Controller, Get, Inject, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller('api/v1')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('TRANSACTION_SERVICE') private readonly transactionSvc: ClientProxy,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post('transactions')
  getTransactionHello(@Body() payload: any): Observable<any> {
    return this.transactionSvc.send('hello_world', payload);
  }
}
