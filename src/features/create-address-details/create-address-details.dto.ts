import {
  IsEmail,
  IsEnum,
  IsAlphanumeric,
  MaxLength,
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

enum TypeOfHousingEnum {
  House = 'House',
  Department = 'Department',
}

enum HousingConditionsEnum {
  Own = 'Own',
  Rented = 'Rented',
  Family = 'Family',
}

enum PhoneNumberTypeEnum {
  WhatsApp = 'WhatsApp',
  Phone = 'Phone',
}

class PhoneNumber {
  @IsOptional()
  @IsNumber()
  number?: number;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  country_code?: string;

  @IsOptional()
  @IsEnum(PhoneNumberTypeEnum)
  type?: PhoneNumberTypeEnum;
}

export class CreateAddressDetailDto {
  @IsOptional()
  @IsEmail({}, { each: true })
  @MaxLength(50, { each: true })
  emails?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhoneNumber)
  phone_numbers?: PhoneNumber[];

  @IsOptional()
  @IsEnum(TypeOfHousingEnum)
  type_of_housing?: TypeOfHousingEnum;

  @IsOptional()
  @IsEnum(HousingConditionsEnum)
  housing_condition?: HousingConditionsEnum;

  @IsOptional()
  @IsString()
  country_of_residence?: string;

  @IsOptional()
  @IsString()
  state_of_residence?: string;

  @IsOptional()
  @IsString()
  city_of_residence?: string;

  @IsOptional()
  @IsAlphanumeric()
  @MaxLength(10)
  zip_code?: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  address?: string;
}
