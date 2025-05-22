import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAddressDetailCommand } from './create-address-details.command';
import { AddressDetailsRepository } from 'src/infrastructure/repositories/address-details.repository/address-details.repository';

@CommandHandler(CreateAddressDetailCommand)
export class CreateAddressDetailHandler
  implements ICommandHandler<CreateAddressDetailCommand>
{
  constructor(
    private readonly addressDetailsRepository: AddressDetailsRepository,
  ) {}

  async execute(command: CreateAddressDetailCommand) {
    const { payload, id } = command;

    const addressDetail = await this.addressDetailsRepository.findOne({
      where: {
        scholarship_application_id: id,
      },
    });
    
    if (addressDetail) {
      return await this.addressDetailsRepository.updateAddressDetailsByApplicationId(
        id,
        payload,
      );
    }

    return await this.addressDetailsRepository.createAddressDetails(
      id,
      payload,
    );
  }
}
