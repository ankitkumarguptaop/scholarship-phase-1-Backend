import { CreatePersonalDetailDto } from "./create-personal-details.dto";

export class CreatePersonalDetailCommand {
  constructor(
    public readonly dto: CreatePersonalDetailDto,
  ) {}
}
