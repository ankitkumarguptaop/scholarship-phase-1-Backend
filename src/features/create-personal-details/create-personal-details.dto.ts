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
  @IsOptional()
  @IsEnum(DocumentType)
  document_type?: DocumentType | null;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  document_number?: string | null;

  @IsOptional()
  @IsEnum(MaritalStatus)
  marital_status?: MaritalStatus | null;

  @IsOptional()
  @IsString()
  application_id?: string | null;

  @IsOptional()
  @IsString()
  city?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  profession?: string | null;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'date_of_birth must be a valid ISO 8601 date string' },
  )
  date_of_birth?: string | null;

  @IsOptional()
  @IsString()
  country?: string | null;

  @IsOptional()
  @IsString()
  province_or_state?: string | null;

  @IsOptional()
  @IsString()
  nationality?: string | null;

  @IsOptional()
  @IsString()
  monthly_income?: string | null;

  @IsOptional()
  @IsString()
  monthly_expenses?: string | null;

  @IsOptional()
  @IsEnum(FinancialDependency)
  financial_dependency?: FinancialDependency | null;

  @IsOptional()
  @IsBoolean()
  has_children?: boolean | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(99)
  children_0_4?: number | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(99)
  children_5_12?: number | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(99)
  children_13_18?: number | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(99)
  children_above_18?: number | null;
}
