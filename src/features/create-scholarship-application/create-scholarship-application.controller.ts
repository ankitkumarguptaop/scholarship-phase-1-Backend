// user.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateScholarshipApplicationDto } from './create-scholarship-application.dto';
import { CreateScholarshipApplicationCommand } from './create-scholarship-application.command';

@Controller('scholarship-appications')
export class CreateScholarshipApplicationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  signup(
    @Body() createScholarshipApplication: CreateScholarshipApplicationDto,
  ) {
    return this.commandBus.execute(
      new CreateScholarshipApplicationCommand(createScholarshipApplication),
    );
  }
}
