import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { PersonalDetailsRepository } from 'src/infrastructure/repositories/personal-details/personal-details.repository';
import { PersonalInformation } from 'src/domain/personal-details/personal-detail.entity';
import { GetPersonalDetailController } from './get-personal-details.controller';
import { GetPersonalDetailsHandler } from './get-personal-details.handler';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalInformation]), CqrsModule],
  controllers: [GetPersonalDetailController],
  providers: [GetPersonalDetailsHandler, PersonalDetailsRepository],
})
export class GetPersonalDetailModule {}
