/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resume } from '../../entity/resume.entity';
@Entity()
export class Certifications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  issuer: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  description: string;

  //if i delete resume delete all certifications
  @ManyToOne(() => Resume, (resume) => resume.certifications, { onDelete: 'CASCADE' })
  resume: Resume;

}
