import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VerifyTokenQuery } from './verify-token.query';
import { NotFound } from 'src/infrastructure/exceptions/exceptions';
import { ScholarshipApplicationRepository } from 'src/infrastructure/repositories/scholarship-appication/scholarship-application.repository';

@QueryHandler(VerifyTokenQuery)
export class VerifyTokenHandler implements IQueryHandler<VerifyTokenQuery> {
  constructor(  private readonly ScholarshipApplicationRepository: ScholarshipApplicationRepository) {}

  async execute(query: VerifyTokenQuery) {
   console.log('✌️query --->', query);

    const application = await this.ScholarshipApplicationRepository.findOne({
      where: {
        token: query.access_token,
      },
    });

    if (!application) {
      throw new NotFound('token is invalid');
    }

    console.log("kjhdsfuiheihfshfvuuiuhuhhuuh" , application);
    return application;
  }
}
