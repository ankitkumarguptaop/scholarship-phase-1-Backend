import {
    Body,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { RolesGuard } from 'src/infrastructure/guards/role.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { VerifyTokenQuery } from './verify-token.query';

@Controller('tokens')
@UseGuards(RolesGuard)
export class VerifyTokenController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: string  ,@Body() body: {access_token: string}) {
    return await this.queryBus.execute(new VerifyTokenQuery(+id,body.access_token));
  }
}
