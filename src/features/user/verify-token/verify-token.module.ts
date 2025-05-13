import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VerifyTokenController } from './verify-token.controller';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { VerifyTokenHandler } from './verify-token.handler';


@Module({
  imports: [CqrsModule],
  controllers: [VerifyTokenController],
  providers: [
    UserRepository,
    VerifyTokenHandler,
  ],
})
export class VerifyTokenModule {}
