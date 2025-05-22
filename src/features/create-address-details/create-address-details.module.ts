import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { PersonalInformation } from 'src/domain/personal-details/personal-detail.entity';
import { CreateAddressDetailHandler } from './create-address-details.handler';
import { AddressDetailsRepository } from 'src/infrastructure/repositories/address-details.repository/address-details.repository';
import { CreateAddressDetailController } from './create-address-details.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalInformation]), CqrsModule],
  controllers: [CreateAddressDetailController],
  providers: [CreateAddressDetailHandler, AddressDetailsRepository],
})
export class CreateAddressDetailModule {}
