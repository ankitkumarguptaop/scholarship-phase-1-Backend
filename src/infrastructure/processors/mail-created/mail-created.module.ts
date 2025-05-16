import { Module } from '@nestjs/common';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { SendMailCommand } from './mail-created.command';
import { SendMailHandler } from './mail-created.handler';
import { SendMailAccessTokenProcessor } from './mail-created.processor';

@Module({
  imports: [],
  providers: [
    SendMailAccessTokenProcessor,
    InboxMessageRepository,
    SendMailCommand,
    SendMailHandler,
  ],
  exports: [SendMailAccessTokenProcessor],
})
export class SendMailAccessTokenModule {}
