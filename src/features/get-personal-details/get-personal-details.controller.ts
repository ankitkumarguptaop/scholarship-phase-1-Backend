import { Controller, Body, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePersonalDetailDto } from './create-personal-details.dto';
import { CreatePersonalDetailCommand } from './create-personal-details.command';

@Controller('scholarships')
export class PersonalDetailController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get("/personal-details")
  async create(@Body() dto: CreatePersonalDetailDto) {
    return this.commandBus.execute(new CreatePersonalDetailCommand(dto));
  }
}
