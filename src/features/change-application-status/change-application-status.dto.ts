import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ScholarshipApplicationStatus } from 'src/domain/scholarship-application/enums';

export class UpdateScholarshipApplicationStatusDto {
  @IsNotEmpty()
  @IsEnum(ScholarshipApplicationStatus)
  status: ScholarshipApplicationStatus;

  @IsNotEmpty()
  @IsString()
  application_uuid: string;
}
