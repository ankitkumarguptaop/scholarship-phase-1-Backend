import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ScholarshipApplicationNotificationLanguage,
  ScholarshipApplicationStatus,
} from './enums';
import { Applicant } from '../applicant/applicant.entity';

@Entity()
export class ScholarshipApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column({ type: 'uuid' })
  applicant_uuid: string;

  @Column({ type: 'uuid' })
  advisor_uuid: string;

  @Column()
  token: string;

  @Column({
    type: 'enum',
    enum: ScholarshipApplicationStatus,
  })
  status: ScholarshipApplicationStatus;

  @Column({ type: 'uuid' })
  information_request_uuid: string;

  @Column({ type: 'uuid' })
  program_uuid: string;

  @Column({ type: 'enum', enum: ScholarshipApplicationNotificationLanguage })
  notification_language: ScholarshipApplicationNotificationLanguage;

  @OneToOne(() => Applicant )
  @JoinColumn({ name: 'applicant_uuid', referencedColumnName: 'uuid' })
  applicant: Applicant;
}
