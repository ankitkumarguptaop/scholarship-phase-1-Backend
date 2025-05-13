import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInUserCommand } from './signin-user.command';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { UnauthorizedException } from '@nestjs/common';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import { EmailSendSucessfully } from 'src/domain/user/events/email-send';

@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly outboxMessageRepository: OutboxMessageRepository,
  ) {}

  async execute(command: SignInUserCommand) {
    const { email, password } = command.signInUserDto;
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (password !== user.password) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = await this.userRepository.generateToken(user.id);

    if (!token) {
      throw new UnauthorizedException('Token is not generated');
    }

    await this.outboxMessageRepository.storeOutboxMessage(
      new EmailSendSucessfully({
        email: user.email,
        access_token:user.access_token,
        arrived_at: new Date(),
      }),
    );

    return { user, token };
  }
}
