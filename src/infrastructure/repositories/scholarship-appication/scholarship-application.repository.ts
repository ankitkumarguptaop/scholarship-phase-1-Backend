import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ScholarshipApplication } from 'src/domain/scholarship-application/scholarship-application.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ScholarshipApplicationRepository extends Repository<ScholarshipApplication> {
  constructor(dataSource: DataSource ,   private configService: ConfigService,) {
    super(ScholarshipApplication, dataSource.createEntityManager()); 
  }
  
  createApplication(
    application: Partial<ScholarshipApplication>,
  ): Promise<ScholarshipApplication> {
    return this.save(application);
  }
  
}
