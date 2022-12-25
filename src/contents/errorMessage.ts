const errorMessage = {
  'USER-ERR-01': '이미 가입된 이메일입니다.', // 회원가입 에러
  'USER-ERR-02': '가입되지 않은 이메일입니다.', // 로그인 에러
  'VALIDATION-ERR-02': '인증 번호가 일치하지 않습니다.', // 회원가입 이메일 인증 코드 에러
  'AUTH-ERR-01': '아이디 또는 비밀번호가 일치하지 않습니다.', // 로그인 에러
} as {
  [key: string]: string;
};

export interface ErrorType {
  errorCode: string;
  message: string;
}

export function getErrorMessage(errorCode: string) {
  return errorMessage[errorCode];
}
