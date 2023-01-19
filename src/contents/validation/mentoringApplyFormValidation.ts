import { z } from 'zod';

export const MenteeInfoFormValidation = z.object({
  name: z.string().min(1, '이름은 필수 입력입니다.'),
  phoneNumber: z
    .string()
    .min(1, '휴대전화 번호는 필수 입력입니다.')
    .regex(/^[0-9]*$/, '숫자만 입력하세요.'),
  status: z.object({
    title: z.string().min(1, '현재 상태는 필수 입력입니다.'),
    value: z.string(),
  }),
  major: z.string().min(1, '전공은 필수 입력입니다.'),
  introduce: z.string().min(10, '최소한 10글자 이상은 입력해주세요.'),
});

export const MentoringInfoFormValidation = z.object({
  schedule: z.string().min(1, '스케줄 입력은 필수입니다.'),
  questions: z.array(
    z.object({
      content: z.string(),
    })
  ),
  wanted: z.string(),
});
