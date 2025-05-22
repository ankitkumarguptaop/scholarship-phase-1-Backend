import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  ScholarshipApplicationNotificationLanguage,
  ScholarshipApplicationStatus,
} from 'src/domain/scholarship-application/enums';

export class CreateScholarshipApplicationDto {
  uuid: string;

  @IsNotEmpty()
  @IsString()
  applicant_uuid: string;

  @IsNotEmpty()
  @IsUUID()
  advisor_uuid: string;

  token: string;

  @IsOptional()
  @IsEnum(ScholarshipApplicationStatus)
  status?: ScholarshipApplicationStatus;

  @IsOptional()
  @IsEnum(ScholarshipApplicationNotificationLanguage)
  notification_language: ScholarshipApplicationNotificationLanguage;

  @IsNotEmpty()
  @IsUUID()
  program_uuid: string;


  @IsNotEmpty()
  @IsUUID()
  information_request_uuid: string;

  
}
