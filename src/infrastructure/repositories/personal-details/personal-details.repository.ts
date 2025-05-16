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

async updatePersonalDetailsByApplicationId(
  applicationId: string,
  details: Partial<PersonalInformation>,
): Promise<PersonalInformation> {
  const existing = await this.findOneBy({ application_id: applicationId });
  if (!existing) {
    throw new Error(`PersonalInformation with application_id ${applicationId} not found`);
  }

  const updated = Object.assign(existing, details);
  return this.save(updated);
}
}
