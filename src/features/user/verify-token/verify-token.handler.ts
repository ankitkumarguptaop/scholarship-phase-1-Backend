import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VerifyTokenQuery } from './verify-token.query';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { NotFound } from 'src/infrastructure/exceptions/exceptions';

@QueryHandler(VerifyTokenQuery)
export class VerifyTokenHandler implements IQueryHandler<VerifyTokenQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: VerifyTokenQuery) {
    console.log('✌️query --->', query);
    const user = await this.userRepository.findOne({
      where: {
        id: query.id,
        access_token: query.access_token,
      },
    });

    if (!user) {
      throw new NotFound('User not found or token is invalid');
    }
    return user;
  }
}
