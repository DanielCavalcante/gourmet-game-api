import { Contract } from './contract';
import { Injectable } from '@nestjs/common';
import { QuestionDto } from '../dtos/question.dto';
import { Jarvis } from '../utils/jarvis';

@Injectable()
export class CreateQuestionContract implements Contract {
  errors: any[];
  validate(model: QuestionDto): boolean {
    const jarvis = new Jarvis();
    jarvis.isRequired(model.name, 'É preciso informar a pergunta.');
    jarvis.isRequired(model.type, 'É preciso informar o tipo da pergunta.');
    this.errors = jarvis.errors;
    return jarvis.isValid();
  }
}
