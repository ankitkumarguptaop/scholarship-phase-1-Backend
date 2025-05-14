import { IsEnum, IsOptional, IsString, MaxLength, IsNumber, IsDateString, IsBoolean, Min, Max } from 'class-validator';
import { DocumentType, FinancialDependency, MaritalStatus } from 'src/domain/personal-details/personal-detail.entity';

export class CreatePersonalDetailDto {
  @IsEnum(DocumentType)
  document_type: DocumentType;

  @IsString()
  @MaxLength(50)
  document_number: string;

  @IsEnum(MaritalStatus)
  marital_status: MaritalStatus;

  @IsString()
  @MaxLength(100)
  profession: string;

  @IsDateString()
  date_of_birth: Date;

  @IsString()
  country: string;

  @IsString()
  province: string;

  @IsOptional()
  @IsString()
  city?: string;

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
