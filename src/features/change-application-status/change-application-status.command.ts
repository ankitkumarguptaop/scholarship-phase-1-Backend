import { ScholarshipApplicationStatus } from 'src/domain/scholarship-application/enums';
import { UpdateScholarshipApplicationStatusDto } from './change-application-status.dto';

export class ChanngeApplicationStatusCommand {
  constructor(public readonly data: UpdateScholarshipApplicationStatusDto) {}
}
