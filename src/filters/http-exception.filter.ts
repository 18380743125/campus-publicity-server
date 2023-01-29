import {
  ExceptionFilter,
  HttpAdapterHost,
} from '@nestjs/common';
import { ArgumentsHost, Catch } from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const msg: unknown = exception['response'] || 'Internal Server Error';

    const responseBody = {
      code: 200,
      message: '服务器异常~',
      error: msg,
    };

    httpAdapter.reply(response, responseBody, 200);
  }
}
