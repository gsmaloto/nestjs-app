import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(process.env.MONGO_URI);
    return 'Hello World!';
  }
}
