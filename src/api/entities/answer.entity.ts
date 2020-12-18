import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Question, { eager: true })
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @Column({
    name: 'created_at',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: Date;

  constructor(params: { name: string; type: string }) {
    if (params !== undefined) {
      Object.assign(this, params);
    }
  }
}
