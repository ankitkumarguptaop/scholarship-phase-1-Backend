import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { NotFound } from 'src/infrastructure/exceptions/exceptions';
import { GetPersonalDetailsQuery } from './get-personal-details.query';
import { PersonalDetailsRepository } from 'src/infrastructure/repositories/personal-details/personal-details.repository';

@QueryHandler(GetPersonalDetailsQuery)
export class GetPersonalDetailsHandler implements IQueryHandler<GetPersonalDetailsQuery> {

  constructor(  private readonly personalDetailsRepository: PersonalDetailsRepository) {}
  async execute(query: GetPersonalDetailsQuery) {
   console.log('✌️query --->', query);

    const personalDetails = await this.personalDetailsRepository.findOne({
      where: {
        application_id: query.application_uuid,
      },
    });

    if (!personalDetails) {
      throw new NotFound('personal details not found');
    }

  
    return personalDetails;
  }
}
