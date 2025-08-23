import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resume } from '../../entity/resume.entity';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: string;

  @Column()
  link: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Resume, (resume) => resume.projects, { onDelete: 'CASCADE' })
  resume: Resume;
}
