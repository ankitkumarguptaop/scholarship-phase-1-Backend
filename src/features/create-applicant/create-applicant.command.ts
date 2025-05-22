import { CreateApplicantDto } from './create-applicant.dto';

export class CreateApplicantCommand {
  constructor(
    public readonly CreateApplicantDto: CreateApplicantDto,
  ) {}
}
