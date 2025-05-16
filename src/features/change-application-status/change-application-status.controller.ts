import { Controller, Body, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ChanngeApplicationStatusCommand } from './change-application-status.command';
import { UpdateScholarshipApplicationStatusDto } from './change-application-status.dto';

@Controller('scholarships')
export class ChanngeApplicationStatusController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch('/applications/status')
  async create(@Body() data: UpdateScholarshipApplicationStatusDto) {
    return this.commandBus.execute(new ChanngeApplicationStatusCommand(data));
  }
}
