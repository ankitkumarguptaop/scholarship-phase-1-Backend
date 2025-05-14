import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { CreateScholarshipApplicationCommand } from './create-scholarship-application.command';
import { ScholarshipApplicationRepository } from 'src/infrastructure/repositories/scholarship-appication/scholarship-application.repository';
import { ScholarshipApplicationAlreadyExistsConflict } from 'src/domain/scholarship-application/exceptions/exception';
import { EmailSendSucessfully } from 'src/domain/scholarship-application/events/email-send';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';

@CommandHandler(CreateScholarshipApplicationCommand)
export class CreateScholarshipApplicationHandler
  implements ICommandHandler<CreateScholarshipApplicationCommand>
{
  constructor(
    private readonly ScholarshipApplicationRepository: ScholarshipApplicationRepository,
    private readonly outboxMessageRepository: OutboxMessageRepository,
  ) {}

  async execute(command: CreateScholarshipApplicationCommand) {
    const { createScholarshipApplicationDto } = command;

    const applicationAlredyExists =
      await this.ScholarshipApplicationRepository.findOne({
        where: {
          applicant_uuid: createScholarshipApplicationDto.applicant_uuid,
        },
      });

    if (applicationAlredyExists) {
      throw new ScholarshipApplicationAlreadyExistsConflict();
    }

    const accessToken = randomBytes(32).toString('hex');
    const application_uuid = uuidv4();

    const userWithToken = {
      ...createScholarshipApplicationDto,
      token: accessToken,
      uuid: application_uuid,
    };

    const application =
      await this.ScholarshipApplicationRepository.createApplication(
        userWithToken,
      );

    await this.outboxMessageRepository.storeOutboxMessage(
      new EmailSendSucessfully({
        email: application.email,
        access_token: application.token,
        arrived_at: new Date(),
      }),
    );

    return application;
  }
}
