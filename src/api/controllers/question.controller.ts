import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { CreateQuestionContract } from '../contracts/create-question.contract';
import { QuestionDto } from '../dtos/question.dto';
import { ValidatorInterceptor } from '../interceptors/validator.interceptor';
import { QuestionService } from '../services/question.service';
import Result from '../utils/result.model';

@Controller('v1/questions')
export class QuestionController {
  constructor(private readonly service: QuestionService) {}

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateQuestionContract()))
  async create(@Body() questionDto: QuestionDto) {
    const question = await this.service.create(questionDto);
    return new Result('Created!', true, question, null);
  }

  @Get()
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (error) {
      throw new HttpException(
        new Result('Erro ao listar pergunta.', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
