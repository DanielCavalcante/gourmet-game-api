import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApiModule } from '../src/api/api.module';
import { QuestionController } from '../src/api/controllers/question.controller';
import { QuestionService } from 'src/api/services/question.service';

describe('Questions', () => {
  let app: INestApplication;
  let questionService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApiModule],
    })
      .overrideProvider(QuestionService)
      .useValue(questionService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET questions`, () => {
    return request(app.getHttpServer()).get('/questions').expect(200).expect({
      data: questionService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
