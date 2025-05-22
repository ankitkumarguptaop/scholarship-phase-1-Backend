import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  
} from 'class-validator';

export class CreateApplicantDto {
  
  uuid: string;

  @IsNotEmpty()
  @IsString()
  name:string;


  @IsNotEmpty()
  @IsString()
  last_name:string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsUUID()
  headquater_abbreviation
  
}
