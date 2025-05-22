import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AddressDetails } from 'src/domain/address-details/address-details.entity';
import { CreateAddressDetailDto } from 'src/features/create-address-details/create-address-details.dto';
import { NotFound } from 'src/infrastructure/exceptions/exceptions';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AddressDetailsRepository extends Repository<AddressDetails> {
  constructor(
    dataSource: DataSource,
    private configService: ConfigService,
  ) {
    super(AddressDetails, dataSource.createEntityManager());
  }

  createAddressDetails(
    scholarship_application_id: number,
    content: Partial<CreateAddressDetailDto>,
  ): Promise<AddressDetails> {
    return this.save({ content, scholarship_application_id });
  }

  async updateAddressDetailsByApplicationId(
    applicationId: number,
    content: Partial<CreateAddressDetailDto>,
  ): Promise<AddressDetails> {
    const existing = await this.findOneBy({
      scholarship_application_id: applicationId,
    });
    if (!existing) {
      throw new NotFound(
        `PersonalInformation with application_id ${applicationId} not found`,
      );
    }

    const updated = Object.assign({ ...existing, content });
    return this.save(updated);
  }
}
