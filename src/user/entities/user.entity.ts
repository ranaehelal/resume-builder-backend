import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Resume } from 'src/resume/entity/resume.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Resume, (resume) => resume.user)
  resumes: Resume[];
}
