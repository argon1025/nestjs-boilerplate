import { HttpStatus } from '@nestjs/common';

/**
 * 응답 에러 정보
 */
export interface ErrorResponseInfo<ErrorCode> {
  code: ErrorCode;
  message: string;
  httpStatus: HttpStatus;
}

/**
 * 동적 에러 레코드 생성
 */
const dynamicErrorRecord = <T extends { [P in keyof T]: ErrorResponseInfo<P> }>(errorList: T) => errorList;

export const ERROR_CODE = dynamicErrorRecord({
  /**
   * 공통 에러
   */
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: '서버 내부 에러',
    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  INVALID_PARAMETER: {
    code: 'INVALID_PARAMETER',
    message: '잘못된 파라미터 입니다',
    httpStatus: HttpStatus.BAD_REQUEST,
  },
});

/**
 * 응답 에러 정보인지 확인합니다.
 */
export const isErrorResponse = (obj: any): obj is ErrorResponseInfo<any> => {
  return obj && obj.code && obj.message && obj.httpStatus;
};
