import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['PASTA', 'CANDIES', 'WITHOUT'],
    name: 'type',
    default: 'WITHOUT',
  })
  type: string;

  @Column({ name: 'image_path', default: '' })
  imagePath: string;

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
