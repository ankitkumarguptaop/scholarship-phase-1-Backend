import { Controller, Body, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAddressDetailsQuery } from './get-address-details.query';

@Controller('scholarship-applications')
export class GetAddressDetailController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get('/:id/address-details')
  async getAddressDetails(
    @Param('id') id: number,
  ) {
    return await this.queryBus.execute(
      new GetAddressDetailsQuery(id),
    );
  }
}
