import { CreateAddressDetailDto } from "./create-address-details.dto";

export class CreateAddressDetailCommand {
  constructor(public readonly payload: Partial<CreateAddressDetailDto> ,public readonly id :number) {}
}
