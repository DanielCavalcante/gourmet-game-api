import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { CreateAnswerContract } from '../contracts/create-answer.contract';
import { AnswerDto } from '../dtos/answer.dto';
import { ValidatorInterceptor } from '../interceptors/validator.interceptor';
import { AnswerService } from '../services/answer.service';
import Result from '../utils/result.model';

@Controller('v1/answers')
export class AnswerController {
  constructor(private readonly service: AnswerService) {}

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateAnswerContract()))
  async create(@Body() answerDto: AnswerDto) {
    const answer = await this.service.create(answerDto);
    return new Result('Criado!', true, answer, null);
  }

  @Get()
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (error) {
      throw new HttpException(
        new Result('Erro ao listar soluções.', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
