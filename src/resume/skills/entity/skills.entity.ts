import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resume } from '../../entity/resume.entity';
@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Resume, (resume) => resume.skills, { onDelete: 'CASCADE' })
  resume: Resume;
}
