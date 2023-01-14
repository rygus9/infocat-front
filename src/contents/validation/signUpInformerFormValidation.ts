import { z } from 'zod';

export const BasicFormValidation = z.object({
  companyEmail: z.string().email('잘못된 이메일 형식입니다.'),
  emailCode: z.string().min(1, '인증 코드는 필수입니다.'),
  name: z.string().min(1, '이름은 필수 입력입니다.'),
  phone: z
    .string()
    .min(1, '휴대전화 번호는 필수 입력입니다.')
    .regex(/^[0-9]*$/, '숫자만 입력하세요.'),
});

export const CareerFormValidation = z.object({
  years: z
    .string()
    .min(1, '연차는 필수 입력입니다.')
    .regex(/^[0-9]*$/, '숫자만 입력하세요.'),
  role: z.string().min(1, '직무는 필수 입력입니다.'),
  careers: z
    .array(
      z.object({
        content: z.string().min(1, '이력 사항은 필수 입력입니다.'),
      })
    )
    .min(1),
});
