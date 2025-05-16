import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ScholarshipApplicationRepository } from 'src/infrastructure/repositories/scholarship-appication/scholarship-application.repository';

import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import { ScholarshipApplication } from 'src/domain/scholarship-application/scholarship-application.entity';
import { ChanngeApplicationStatusController } from './change-application-status.controller';
import { ChanngeApplicationStatusHandler } from './change-application-status.handler';

@Module({
  imports: [TypeOrmModule.forFeature([ScholarshipApplication]), CqrsModule],
  controllers: [ChanngeApplicationStatusController],
  providers: [
    ScholarshipApplicationRepository,
    ChanngeApplicationStatusHandler,
    OutboxMessageRepository,
  ],
  exports: [TypeOrmModule],
})
export class ChanngeApplicationStatusModule {}
