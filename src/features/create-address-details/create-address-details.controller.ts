import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAddressDetailDto } from './create-address-details.dto';
import { CreateAddressDetailCommand } from './create-address-details.command';

@Controller('scholarship-applications')
export class CreateAddressDetailController {
  constructor(private readonly commandBus: CommandBus) {}

  @Put('/:id/address-details')
  async create(@Body() dto: Partial<CreateAddressDetailDto>  , @Param('id') id: number) {
    return this.commandBus.execute(new CreateAddressDetailCommand(dto , id));
  }
}
