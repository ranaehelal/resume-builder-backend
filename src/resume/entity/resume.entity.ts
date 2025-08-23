/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Skill } from '../skills/entity/skills.entity';
import { Experiences } from '../experiences/entity/experiences.entity';

import { Education } from '../education/entity/education.entity';
import { Certifications } from '../certifications/entity/certifications.entity';
import { Projects } from '../projects/entity/projects.entity';
@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  summary: string;

  @ManyToOne(() => User, (user) => user.resumes)
  user: User;

  @OneToMany(() => Skill, (skill) => skill.resume)
  skills: Skill[];

  @OneToMany(() => Certifications, (cert) => cert.resume)
  certifications: Certifications[];

  @OneToMany(() => Education, (edu) => edu.resume)
  education: Education[];

  @OneToMany(() => Experiences, (exp) => exp.resume)
  experiences: Experiences[];

  @OneToMany(() => Projects, (proj) => proj.resume)
  projects: Projects[];
}
