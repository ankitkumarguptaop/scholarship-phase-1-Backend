import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ScholarshipApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  applicant_uuid: string;

  @Column()
  advisor_uuid: string;

  @Column()
  token: string;

  @Column()
  email: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
