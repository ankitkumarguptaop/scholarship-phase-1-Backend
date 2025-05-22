import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { NotFound } from 'src/infrastructure/exceptions/exceptions';
import { GetAddressDetailsQuery } from './get-address-details.query';
import { AddressDetailsRepository } from 'src/infrastructure/repositories/address-details.repository/address-details.repository';

@QueryHandler(GetAddressDetailsQuery)
export class GetAddressDetailsHandler
  implements IQueryHandler<GetAddressDetailsQuery>
{
  constructor(
    private readonly AddressDetailsRepository: AddressDetailsRepository,
  ) {}
  async execute(query: GetAddressDetailsQuery) {
    const AddressDetails = await this.AddressDetailsRepository.findOne({
      where: {
        scholarship_application_id: query.id,
      },
    });

    if (!AddressDetails) {
      throw new NotFound('Address details not found');
    }

    return AddressDetails;
  }
}
