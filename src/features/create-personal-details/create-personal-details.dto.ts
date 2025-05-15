import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
  IsDateString,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';
import {
  DocumentType,
  FinancialDependency,
  MaritalStatus,
} from 'src/domain/personal-details/personal-detail.entity';

export class CreatePersonalDetailDto {
  @IsEnum(DocumentType)
  document_type: DocumentType;

  @IsString()
  @MaxLength(50)
  document_number: string;

  @IsEnum(MaritalStatus)
  marital_status: MaritalStatus;

  @IsString()
  application_id: string;

    @IsString()
  city: string;

  @IsString()
  @MaxLength(100)
  profession: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'date_of_birth must be a valid ISO 8601 date string' },
  )
  date_of_birth?: Date | null;

  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  province_or_state?: string;

  @IsString()
  nationality: string;

  @IsNumber()
  monthly_income: number;

  @IsNumber()
  monthly_expenses: number;

  @IsEnum(FinancialDependency)
  financial_dependency: FinancialDependency;

  @IsBoolean()
  has_children: boolean;

  @IsNumber()
  @Min(0)
  @Max(99)
  children_0_4: number;

  @IsNumber()
  @Min(0)
  @Max(99)
  children_5_12: number;

  @IsNumber()
  @Min(0)
  @Max(99)
  children_13_18: number;

  @IsNumber()
  @Min(0)
  @Max(99)
  children_above_18: number;
}
