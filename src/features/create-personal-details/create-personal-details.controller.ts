import { Controller, Body, Put, HttpCode } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePersonalDetailDto } from './create-personal-details.dto';
import { CreatePersonalDetailCommand } from './create-personal-details.command';

@Controller('scholarships')
export class PersonalDetailController {
  constructor(private readonly commandBus: CommandBus) {}

  @Put('/applications/personal-details')
  @HttpCode(201)
  async create(@Body() dto: CreatePersonalDetailDto) {
    return this.commandBus.execute(new CreatePersonalDetailCommand(dto));
  }
}
