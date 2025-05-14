import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePersonalDetailCommand } from './create-personal-details.command';
import { PersonalDetailsRepository } from 'src/infrastructure/repositories/personal-details/personal-details.repository';

@CommandHandler(CreatePersonalDetailCommand)
export class CreatePersonalDetailHandler
  implements ICommandHandler<CreatePersonalDetailCommand>
{
  constructor(
    private readonly personalDetailsRepository: PersonalDetailsRepository,
  ) {}

  async execute(command: CreatePersonalDetailCommand) {
    return await this.personalDetailsRepository.createPersonalDetails(
      command.dto,
    );
  }
}
