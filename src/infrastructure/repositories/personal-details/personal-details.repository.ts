import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PersonalInformation } from 'src/domain/personal-details/personal-detail.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PersonalDetailsRepository extends Repository<PersonalInformation> {
  constructor(
    dataSource: DataSource,
    private configService: ConfigService,
  ) {
    super(PersonalInformation, dataSource.createEntityManager());
  }

  createPersonalDetails(
    details: Partial<PersonalInformation>,
  ): Promise<PersonalInformation> {
    return this.save(details);
  }

 
}
