import { InjectRepository } from '@nestjs/typeorm';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { Transactional } from 'typeorm-transactional';
import { EventPayload } from '../common/event.interface';
import { SendMailHandler } from './mail-created.handler';
import { MailCreatedBody } from './mail-created.interface';
import { SendMailCommand } from './mail-created.command';

export class SendMailAccessTokenProcessor {
  constructor(
    @InjectRepository(InboxMessageRepository)
    private inboxMessageRepository: InboxMessageRepository,
    private handler: SendMailHandler,
  ) {}

  getHandlerName(): string {
    return this.constructor.name;
  }

  @Transactional()
  async handleEvent(payload: EventPayload<MailCreatedBody>) {
    const { email, access_token } = payload.body.mail;

    const command = new SendMailCommand(access_token, email);

    await this.handler.handle(command);

    await this.inboxMessageRepository.storeInboxMessage({
      message_id: payload.messageId,
      handler_name: this.getHandlerName(),
    });
  }
}
