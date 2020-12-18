import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerController } from './controllers/answer.controller';
import { QuestionController } from './controllers/question.controller';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';
import { AnswerService } from './services/answer.service';
import { QuestionService } from './services/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer])],
  providers: [QuestionService, AnswerService],
  controllers: [QuestionController, AnswerController],
})
export class ApiModule {}
