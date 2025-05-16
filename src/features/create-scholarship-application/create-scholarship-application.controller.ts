// user.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { randomBytes } from 'crypto';
import { CreateScholarshipApplicationDto } from './create-scholarship-application.dto';
import { CreateScholarshipApplicationCommand } from './create-scholarship-application.command';

@Controller('scholarships')
export class CreateScholarshipApplicationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/applications')
  signup(
    @Body() createScholarshipApplication: CreateScholarshipApplicationDto,
  ) {
    return this.commandBus.execute(
      new CreateScholarshipApplicationCommand(createScholarshipApplication),
    );
  }
}
