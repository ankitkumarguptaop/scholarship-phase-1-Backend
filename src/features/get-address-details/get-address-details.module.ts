import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { GetAddressDetailController } from './get-address-details.controller';
import { AddressDetailsRepository } from 'src/infrastructure/repositories/address-details.repository/address-details.repository';
import { AddressDetails } from 'src/domain/address-details/address-details.entity';
import { GetAddressDetailsHandler } from './get-address-details.handler';

@Module({
  imports: [TypeOrmModule.forFeature([AddressDetails]), CqrsModule],
  controllers: [GetAddressDetailController],
  providers: [GetAddressDetailsHandler, AddressDetailsRepository],
})
export class GetAddressDetailModule {}
