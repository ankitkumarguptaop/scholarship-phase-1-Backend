import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PersonalDetailsRepository } from 'src/infrastructure/repositories/personal-details/personal-details.repository';
import { ChanngeApplicationStatusCommand } from './change-application-status.command';
import { ScholarshipApplicationRepository } from 'src/infrastructure/repositories/scholarship-appication/scholarship-application.repository';
import { NotFound } from 'src/infrastructure/exceptions/exceptions';

@CommandHandler(ChanngeApplicationStatusCommand)
export class ChanngeApplicationStatusHandler
  implements ICommandHandler<ChanngeApplicationStatusCommand>
{
  constructor(
    private readonly ScholarshipApplicationRepository: ScholarshipApplicationRepository,
  ) {}

  async execute(command: ChanngeApplicationStatusCommand) {
    const applicationsDetails =
      await this.ScholarshipApplicationRepository.findOne({
        where: {
          uuid: command.data.application_uuid,
        },
      });
    if (!applicationsDetails) {
      throw new NotFound('application not found to update status ');
    }

    const isUpdatedStatus = this.ScholarshipApplicationRepository.updateStatus(
      command.data,
    );

    if (!isUpdatedStatus) {
      throw new NotFound('application not found to update status ');
    }
    return {
      message: 'token updated sucessfully',
    };
  }
}
