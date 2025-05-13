import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { UserEmailAlreadyExistsConflict } from 'src/domain/user/exceptions/exception';
import { randomBytes } from 'crypto';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand) {
    const { createUserDto } = command;

    const userAlreadyExist = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (userAlreadyExist) {
      throw new UserEmailAlreadyExistsConflict();
    }

    const accessToken = randomBytes(32).toString('hex');

    const userWithToken = {
      ...createUserDto,
      access_token:accessToken,
    };

    return await this.userRepository.createUser(userWithToken);
  }
}
