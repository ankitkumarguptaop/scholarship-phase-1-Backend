// user.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateApplicantDto } from './create-applicant.dto';
import { CreateApplicantCommand } from './create-applicant.command';

@Controller('scholarship-applicants')
export class CreateApplicantController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  signup(
    @Body() CreateApplicant: CreateApplicantDto,
  ) {
    return this.commandBus.execute(
      new CreateApplicantCommand(CreateApplicant),
    );
  }
}
