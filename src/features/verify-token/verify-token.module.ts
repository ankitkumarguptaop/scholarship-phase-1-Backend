import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VerifyTokenController } from './verify-token.controller';
import { VerifyTokenHandler } from './verify-token.handler';
import { ScholarshipApplicationRepository } from 'src/infrastructure/repositories/scholarship-appication/scholarship-application.repository';


@Module({
  imports: [CqrsModule],
  controllers: [VerifyTokenController],
  providers: [
    ScholarshipApplicationRepository,
    VerifyTokenHandler,
  ],
})
export class VerifyTokenModule {}
