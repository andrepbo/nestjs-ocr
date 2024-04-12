import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello, you are in the ${process.env.NODE_ENV} environment`;
  }
}
