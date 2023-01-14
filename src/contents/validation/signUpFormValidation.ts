import { z } from 'zod';

export const FirstFormValidation = z.object({
  email: z.string().email('잘못된 이메일 형식입니다.'),
  nickName: z.string().min(4, '닉네임은 4글자 이상입니다.').max(10, '닉네임은 10글자 이하입니다.'),
  aboutPassword: z
    .object({
      password: z
        .string()
        .min(6, '비밀번호는 8글자 이상입니다.')
        .regex(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/,
          '비밀번호는 영어, 숫자, 특수 문자를 하나 이상 포함해야 합니다.'
        )
        .max(20, '비밀번호는 20글자 이하입니다.'),
      passwordValid: z.string().min(1, '비밀번호 검증은 필수 입력입니다.'),
    })
    .refine((data) => data.password === data.passwordValid, { path: ['passwordValid'], message: '비밀번호가 일치하지 않습니다.' }),
});
