import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Applicant } from 'src/domain/applicant/applicant.entity';
import { CreateApplicantDto } from 'src/features/create-applicant/create-applicant.dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ApplicantRepository extends Repository<Applicant> {
  constructor(
    dataSource: DataSource,
    private configService: ConfigService,
  ) {
    super(Applicant, dataSource.createEntityManager());
  }

  createApplicant(application: CreateApplicantDto): Promise<Applicant> {
    return this.save(application);
  }
}
