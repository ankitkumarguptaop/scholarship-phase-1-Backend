import { Injectable } from '@nestjs/common';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import { OutboxMessage } from 'src/domain/outbox-message/outbox-message.entity';
import { RabbitmqConnectionService } from 'src/infrastructure/message-bus/rabbitmq/config/rabbitmq-connection.service';
import {
  ConfigType,
  RabbitMQPublishMessage,
} from 'src/infrastructure/message-bus/rabbitmq/rabbitmq.interface';
import { RabbitmqConfigurerService } from 'src/infrastructure/message-bus/rabbitmq/config/rabbitmq-configurer.service';

@Injectable()
export class ProducerService {
  private connection: RabbitmqConnectionService;
  private config: ConfigType;

  constructor(
    private readonly rabbitmqConfigurerService: RabbitmqConfigurerService,
    private readonly rabbitmqConnectionService: RabbitmqConnectionService,
    private readonly outboxMessageRepository: OutboxMessageRepository,
  ) {
    this.connection = this.rabbitmqConnectionService;
    this.config = this.connection.getConnectionConfiguration();
  }

  async publishMessages(messages: OutboxMessage[]) {
    await this.connect(); 

    for (const message of messages) { 
      await this.publisher(message); // publish message to Queue
    }

    await this.close();
  }

  private async connect() {
    await this.connection.connect(); // connect to rabbit MQ server 
    await this.rabbitmqConfigurerService.configure(); // implement qeues and exchanges 
  }

  private async close() {
    await this.connection.closeChannel();  
  }

  private async publisher(outboxMessage: OutboxMessage) {
    try {
      const message = outboxMessage.getBody();
      const properties = outboxMessage.getProperties();
      const messageToPublish: RabbitMQPublishMessage = {
        exchange: this.config.fanoutExchange,
        bindingKey: '', //fanout exchange 
        content: JSON.stringify(message),
        properties: { ...properties, persistent: true },
      };

      const isPublished = await this.connection.publish(messageToPublish); // Publish message to Queue 
      if (!isPublished) throw new Error('Message could not be published.');

      outboxMessage.markAsSent();

      await this.outboxMessageRepository.save(outboxMessage);
    } catch (error) {
      console.log(
        `Error while publishing message ${outboxMessage.type} with id ${outboxMessage.message_id}`,
        error,
      );
    }
  }
}
