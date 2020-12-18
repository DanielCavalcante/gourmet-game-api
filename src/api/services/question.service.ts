import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly repository: Repository<Question>,
  ) {}

  async findAll(): Promise<Question[]> {
    return await this.repository.find();
  }

  async create(questionDto) {
    return await this.repository.save(questionDto);
  }
}
