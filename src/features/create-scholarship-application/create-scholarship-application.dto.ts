import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
}
