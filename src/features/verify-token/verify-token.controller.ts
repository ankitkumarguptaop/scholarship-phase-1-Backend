import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { VerifyTokenQuery } from './verify-token.query';

@Controller('scholarships')
export class VerifyTokenController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('/applicants/login')
  @HttpCode(200)
  async verifyToken(@Body() body: { access_token: string }) {
    return await this.queryBus.execute(new VerifyTokenQuery(body.access_token));
  }
}
