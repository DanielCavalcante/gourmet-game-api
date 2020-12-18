import { Contract } from './contract';
import { Injectable } from '@nestjs/common';
import { AnswerDto } from '../dtos/answer.dto';
import { Jarvis } from '../utils/jarvis';

@Injectable()
export class CreateAnswerContract implements Contract {
  errors: any[];
  validate(model: AnswerDto): boolean {
    const jarvis = new Jarvis();
    jarvis.isRequired(model.name, 'É preciso informar a resposta.');
    jarvis.isRequired(
      model.questionId,
      'É preciso informar de qual pergunta essa resposta pertence.',
    );
    jarvis.isFixedLen(
      model.questionId,
      36,
      'Valor do questionId não é permitido.',
    );

    this.errors = jarvis.errors;
    return jarvis.isValid();
  }
}
