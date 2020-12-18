import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Contract } from '../contracts/contract';
import Result from '../utils/result.model';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
  constructor(public contract: Contract) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const body = context.switchToHttp().getRequest().body;
    const valid = this.contract.validate(body);
    console.log(this.contract.errors);
    if (!valid)
      throw new HttpException(
        new Result(
          'Error',
          false,
          this.contract.errors,
          HttpStatus.BAD_REQUEST,
        ),
        HttpStatus.BAD_REQUEST,
      );

    return next.handle();
  }
}
