import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ScholarshipApplication } from 'src/domain/scholarship-application/scholarship-application.entity';
import { UpdateScholarshipApplicationStatusDto } from 'src/features/change-application-status/change-application-status.dto';
import { CreateScholarshipApplicationDto } from 'src/features/create-scholarship-application/create-scholarship-application.dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ScholarshipApplicationRepository extends Repository<ScholarshipApplication> {
  constructor(
    dataSource: DataSource,
    private configService: ConfigService,
  ) {
    super(ScholarshipApplication, dataSource.createEntityManager());
  }

  createApplication(
    application: CreateScholarshipApplicationDto,
  ): Promise<ScholarshipApplication> {
    return this.save(application);
  }

  async updateStatus({
    status,
    application_uuid,
  }: UpdateScholarshipApplicationStatusDto): Promise<ScholarshipApplication> {
    const existing = await this.findOneBy({ uuid: application_uuid });
    if (!existing) {
      throw new Error(
        `Application with application_id ${application_uuid} not found`,
      );
    }

    const updated = { ...existing, status };
    return this.save(updated);
  }
}
