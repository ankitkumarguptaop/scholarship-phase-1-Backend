import { Injectable } from '@nestjs/common';
import * as RabbitMQ from 'amqplib';
import { RabbitmqConfigurerService } from 'src/infrastructure/message-bus/rabbitmq/config/rabbitmq-configurer.service';
import { InboxMessageHandler } from 'src/infrastructure/message-bus/inbox-message-handler.service';
import { RabbitmqConnectionService } from 'src/infrastructure/message-bus/rabbitmq/config/rabbitmq-connection.service';
import { ConfigType } from 'src/infrastructure/message-bus/rabbitmq/rabbitmq.interface';

@Injectable()
export class ConsumerService {
  private config: ConfigType;
  private channel: RabbitMQ.Channel;
  private signatureTypes: string[];
  private prefetchLimit: number;

  constructor(
    private readonly rabbitmqConfigurerService: RabbitmqConfigurerService,
    private readonly connection: RabbitmqConnectionService,
    private readonly messageHandler: InboxMessageHandler,
  ) {
    this.config = this.connection.getConnectionConfiguration();
    this.prefetchLimit = this.config.consumeMessageLimit;
    this.signatureTypes = this.messageHandler.getSignatureType();
    this.connection.rabbitMqEvents.on('connected', this.consume.bind(this));
  }

  async consumeMessage(limit: number) {
    this.prefetchLimit = limit || this.prefetchLimit;
    await this.connection.connect();
  }

  private async consume(limit: number) {
    this.channel = this.connection.getChannel();
    await this.channel?.prefetch(limit || this.prefetchLimit);
    await this.rabbitmqConfigurerService.configure();
    console.log('kndjkfgn');
    await this.startConsuming();
    console.log(`Waiting for messages in ${this.config.primaryQueue}....`);
  }

  private hasBeenRedeliveredTooMuch(redeliveryCount: number) {
    return redeliveryCount >= this.config.delayedRetriesNumber;
  }

  private async handleError(
    message: RabbitMQ.Message,
    error: Array<Error>,
    redeliveryCount: number,
  ) {
    if (this.hasBeenRedeliveredTooMuch(redeliveryCount))
      await this.connection.deadLetter(message, error);
    else await this.connection.retry(message, error);
  }

  async startConsuming() {
    console.log('jdjsbcjd');
    await this.channel.consume(
      this.config.primaryQueue,
      async (message: RabbitMQ.Message) => {
        if (message === null) return;
        if (!message?.properties?.headers) message.properties.headers = {};

        console.log(
          '\n\n================= NEW MESSAGE CONSUMING AT',
          new Date(),
          '=================',
        );

        const redeliveryCount =
          message.properties.headers['redelivery_count'] || 0;
        const type =
          message?.properties?.type || message?.properties?.headers?.type;
        const retryEndpoint = message?.properties?.headers?.retry_endpoint;

        console.log(
          'INFO Received message:',
          type,
          '|',
          'Message redelivery count:',
          redeliveryCount,
        );

        if (!message.properties?.messageId) {
          console.log(
            'INFO Message ignored: Message does not have a messageId.',
          );
          this?.channel.ack(message);
          return;
        }

        if (!type || !this.signatureTypes.includes(type)) {
          console.log(
            'INFO Message ignored: No available handler found or missing message type property.',
          );
          this?.channel.ack(message);
          return;
        }

        if (redeliveryCount > 0 && retryEndpoint !== this.config.appName) {
          console.log(
            'INFO Message ignored: Message is not intended for this service.',
          );
          this?.channel.ack(message);
          return;
        }

        try {
          await this.messageHandler.handleMessage(
            message,
            this.config.immediateRetriesNumber,
          );
        } catch (error: any) {
          await this.handleError(message, error, redeliveryCount);
        } finally {
          this?.channel.ack(message);
        }
      },
    );
  }
}
