import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ScholarshipApplicationStatus } from 'src/domain/scholarship-application/enums';

export class CreateScholarshipApplicationDto {
  uuid: string;

  @IsNotEmpty()
  @IsString()
  applicant_uuid: string;

  @IsNotEmpty()
  @IsString()
  advisor_uuid: string;

  token: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(ScholarshipApplicationStatus)
  status?: ScholarshipApplicationStatus;
}
