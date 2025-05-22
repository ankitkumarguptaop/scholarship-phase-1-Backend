import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AddressDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false  ,unique: true})
  scholarship_application_id: number;

  @Column({ nullable: false ,type: 'json'})
  content : any;

}
