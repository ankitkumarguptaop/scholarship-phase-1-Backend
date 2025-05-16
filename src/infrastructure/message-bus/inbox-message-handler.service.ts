import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignatureTypes } from 'src/infrastructure/processors/signature-types.service';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { RabbitmqConnectionService } from './rabbitmq/config/rabbitmq-connection.service';
import * as RabbitMQ from 'amqplib';

@Injectable()
export class InboxMessageHandler {
  constructor(
    private readonly rabbitmqConnectionService: RabbitmqConnectionService,
    private readonly signatureTypes: SignatureTypes,
    @InjectRepository(InboxMessageRepository)
    private inboxMessageRepository: InboxMessageRepository,
  ) {}

  getSignatureType() {
    return Object.keys(this.signatureTypes.getSignatureTypes());
  }

  async handleMessage(message: RabbitMQ.Message, max_retry_counts: number) {
    const messageId = message.properties.messageId;
    const message_type =
      message.properties.type || message.properties.headers.type;
    const signatureTypes = this.signatureTypes.getSignatureTypes();
    const handlers = signatureTypes[message_type];

    const handlerPromises = handlers.map(async (lazyHandler) => {
      const handler = await lazyHandler;
      let retryCount = max_retry_counts;
      const duplicateMessage =
        await this.inboxMessageRepository.getInboxMessageById(
          messageId,
          handler.getHandlerName(),
        );
      if (duplicateMessage) {
        console.log(
          `INFO Message with id ${messageId} already handled with ${handler.getHandlerName()}. Duplicate message ignored.`,
        );
        return;
      }
      const parsedMessage =
        this.rabbitmqConnectionService.robustParseMessageContent(message);

      console.log(
        'INFO Handling message with the following parsed content:',
        parsedMessage,
      );

      const messageObj = {
        messageId: messageId,
        body: parsedMessage,
      };

      let err: Error;

      while (retryCount >= 0) {
        try {
          console.log(
            `INFO Handling message with messageId: ${messageId} and handler ${handler.getHandlerName()}`,
          );
          await handler.handleEvent(messageObj);
          console.log(`INFO Message ${messageId} handled successfully.`);
          return;
        } catch (error) {
          retryCount--;
          err = error;
        }
      }

      if (retryCount < 0) throw err;
    });

    const results = await Promise.allSettled(handlerPromises);
    const rejectedPromises = results.filter(
      (result) => result.status === 'rejected',
    );
    if (rejectedPromises.length) {
      throw rejectedPromises.map((result) => result.reason);
    }
  }
}
