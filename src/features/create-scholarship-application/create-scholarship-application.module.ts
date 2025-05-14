import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ScholarshipApplicationRepository } from 'src/infrastructure/repositories/scholarship-appication/scholarship-application.repository';
import { CreateScholarshipApplicationHandler } from './create-scholarship-application.handler';
import { CreateScholarshipApplicationController } from './create-scholarship-application.controller';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import { ScholarshipApplication } from 'src/domain/scholarship-application/scholarship-application.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ScholarshipApplication]) , CqrsModule],
  controllers: [CreateScholarshipApplicationController],
  providers: [
    ScholarshipApplicationRepository,
    CreateScholarshipApplicationHandler,
    OutboxMessageRepository
  ],
  exports: [TypeOrmModule],
})

export class CreateScholarShipApplicationModule {}
