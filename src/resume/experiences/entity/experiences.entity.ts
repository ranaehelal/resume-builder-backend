/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resume } from '../../entity/resume.entity';

@Entity()
export class Experiences {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobTitle: string;

  @Column()
  company: string;

  @Column()
  dateRange: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Resume, (resume) => resume.experiences, { onDelete: 'CASCADE' })
  resume: Resume;
}
