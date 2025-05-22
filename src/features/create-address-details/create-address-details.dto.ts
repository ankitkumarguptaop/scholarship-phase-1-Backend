import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsAlphanumeric,
  MaxLength,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

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

export class CreateAddressDetailDto {
  @IsEmail({}, { each: true })
  @MaxLength(50)
  emails: string[];

  phone_numbers: PhoneNumber[];

  @IsEnum(TypeOfHousingEnum)
  type_of_housing: TypeOfHousingEnum;

  @IsEnum(HousingConditionsEnum)
  housing_condition: HousingConditionsEnum;

  @IsNotEmpty()
  country_of_residence: string;

  @IsNotEmpty()
  state_of_residence: string;

  @IsNotEmpty()
  city_of_residence: string;

  @IsOptional()
  @IsAlphanumeric()
  @MaxLength(10)
  zip_code: string;

  @IsString()
  @MaxLength(250)
  address: string;
}

class PhoneNumber {
  @IsNumber()
  @MaxLength(20)
  number: number;

  @IsString()
  @MaxLength(10)
  country_code: string;

  @IsEnum(PhoneNumberTypeEnum)
  type: PhoneNumberTypeEnum;
}
