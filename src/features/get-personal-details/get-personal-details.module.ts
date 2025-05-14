import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { PersonalDetailController } from './create-personal-details.controller';
import { CreatePersonalDetailHandler } from './create-personal-details.handler';
import { PersonalDetailsRepository } from 'src/infrastructure/repositories/personal-details/personal-details.repository';
import { PersonalInformation } from 'src/domain/personal-details/personal-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalInformation]), CqrsModule],
  controllers: [PersonalDetailController],
  providers: [CreatePersonalDetailHandler, PersonalDetailsRepository],
})
export class PersonalDetailModule {}
