import { Controller, Body, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPersonalDetailsQuery } from './get-personal-details.query';

@Controller('scholarships/applications')
export class GetPersonalDetailController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get('/:application_uuid/personal-details')
  async getPersonalDetails(
    @Param('application_uuid') application_uuid: string,
  ) {
    return await this.queryBus.execute(
      new GetPersonalDetailsQuery(application_uuid),
    );
  }
}
