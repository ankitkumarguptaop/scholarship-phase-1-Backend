import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';
import { CreateApplicantCommand } from './create-applicant.command';
import { ApplicantRepository } from 'src/infrastructure/repositories/applicant/applicant.repository';
import { create } from 'domain';

@CommandHandler(CreateApplicantCommand)
export class CreateApplicantHandler
  implements ICommandHandler<CreateApplicantCommand>
{
  constructor(private readonly applicantRepository: ApplicantRepository) {}

  async execute(command: CreateApplicantCommand) {
    const { CreateApplicantDto } = command;

    const appicationData = {
      uuid: uuidv4(),
      ...CreateApplicantDto,
    };

    const appicant = this.applicantRepository.createApplicant(appicationData);

    return appicant;
  }
}
