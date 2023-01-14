import { z } from 'zod';

export const mentoringCreateFormValidation = z.object({
  careers: z.array(
    z.object({
      content: z.string(),
    })
  ),
  mentoringName: z.string().min(1, '멘토링 이름은 필수 입력입니다.').max(50, '멘토링 이름은 50자 이하입니다.'),
  mentoringShortIntro: z.string().min(1, '멘토링 짧은 소개는 필수 입력입니다.').max(200, '짧은 소개는 200자 이하 입니다.'),
  // mentoringField: z.object({ value: z.string(), name: z.string() }),
  mentoringField: z.array(z.string()).min(1, '희망 분야는 적어도 한 개 이상 선택해야 합니다.'),
  mentoringCategory: z.object({ subCategory: z.string(), subValue: z.string() }, { required_error: '카테고리는 필수 입력입니다.' }),
  mentoringContent: z.string().min(1, '멘토링 소개는 필수 입력입니다.'),
  price: z.string().min(1, '포인트 가격은 필수 입력입니다.'),
  timeScale: z.object({ value: z.string(), title: z.string() }),
  startTimes: z.array(z.string()).min(1, '시간 하나 이상은 필수입력입니다.'),
});
