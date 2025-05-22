import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VerifyTokenQuery } from './verify-token.query';
import { NotFound } from 'src/infrastructure/exceptions/exceptions';
import { ScholarshipApplicationRepository } from 'src/infrastructure/repositories/scholarship-appication/scholarship-application.repository';

@QueryHandler(VerifyTokenQuery)
export class VerifyTokenHandler implements IQueryHandler<VerifyTokenQuery> {
  constructor(  private readonly ScholarshipApplicationRepository: ScholarshipApplicationRepository) {}

  async execute(query: VerifyTokenQuery) {

    const application = await this.ScholarshipApplicationRepository.findOne({ 
      relations:['applicant'],
      where: {
        token: query.access_token,
      },
    });

    if (!application) {
      throw new NotFound('token is invalid');
    }

    return {
      ...application,
      message: 'token is valid',
    };
  }
}
