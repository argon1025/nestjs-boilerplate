import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ERROR_CODE } from '../error-code.constant';

const GenerateValidationException = (errors: ValidationError[]) => {
  if (!errors[0]?.constraints) throw new BadRequestException(ERROR_CODE.INVALID_PARAMETER);
  const firstKey = Object.keys(errors[0].constraints)[0];
  throw new BadRequestException({ ...ERROR_CODE.INVALID_PARAMETER, message: errors[0].constraints[firstKey] });
};

export default GenerateValidationException;
