import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Applicant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'uuid' })
  uuid: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ nullable: false, type: 'uuid' })
  headquater_abbreviation: string;

}
