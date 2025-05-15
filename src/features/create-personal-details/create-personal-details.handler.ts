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
    const personalDetails = await this.personalDetailsRepository.findOne({
      where: {
        application_id: command.dto.application_id,
      },
    });
    if (personalDetails) {
      return await this.personalDetailsRepository.updatePersonalDetailsByApplicationId(
        command.dto.application_id,
        command.dto,
      );
    }

    return await this.personalDetailsRepository.createPersonalDetails(
      command.dto,
    );
  }
}
