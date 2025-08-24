/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Resume } from '../../resume/entity/resume.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column()
  @ApiProperty({ example: 'John' })
  firstName: string;

  @Column()
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'johndoe' })
  username: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @Column()
  password: string; // This won't be exposed in API responses

  @OneToMany(() => Resume, (resume) => resume.user)
  resumes: Resume[];
}