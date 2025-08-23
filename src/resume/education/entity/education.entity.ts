import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resume } from '../../entity/resume.entity';

@Entity()
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  degree: string;

  @Column()
  institution: string;

  @Column()
  areaOfStudy: string;

  @Column()
  dateRange: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  gpa: string;

  @ManyToOne(() => Resume, (resume) => resume.education, {
    onDelete: 'CASCADE',
  })
  resume: Resume;
}
