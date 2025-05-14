import { Body, Controller, Get, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { VerifyTokenQuery } from './verify-token.query';

@Controller('scholarships')
export class VerifyTokenController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('/applicants/login')
  async verifyToken(@Body() body: { access_token: string }) {
    console.log('✌️access_token --->', body.access_token);
    return await this.queryBus.execute(new VerifyTokenQuery(body.access_token));
  }
}
