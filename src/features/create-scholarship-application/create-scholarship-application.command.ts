import { CreateScholarshipApplicationDto } from './create-scholarship-application.dto';

export class CreateScholarshipApplicationCommand {
  constructor(
    public readonly createScholarshipApplicationDto: CreateScholarshipApplicationDto,
  ) {}
}
