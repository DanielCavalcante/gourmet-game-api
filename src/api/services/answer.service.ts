import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly repository: Repository<Answer>,
  ) {}

  async findAll(): Promise<Answer[]> {
    return await this.repository.find();
  }

  async create(answerDto) {
    return await this.repository.save(answerDto);
  }
}
