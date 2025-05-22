import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateApplicantHandler } from './create-applicant.handler';
import { CreateApplicantController } from './create-applicant.controller';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import { ScholarshipApplication } from 'src/domain/scholarship-application/scholarship-application.entity';
import { ApplicantRepository } from 'src/infrastructure/repositories/applicant/applicant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ScholarshipApplication]), CqrsModule],
  controllers: [CreateApplicantController],
  providers: [
    ApplicantRepository,
    CreateApplicantHandler,
    OutboxMessageRepository,
  ],
  exports: [TypeOrmModule],
})
export class CreateApplicantModule {}
