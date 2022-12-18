import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TextInput from '../shared/input/TextInput';
import WrapLabel from '../shared/input/WrapLabel';
import CareersInput from './CareersInput';
import FieldInput from './FieldInput';

const schema = z.object({
  companyEmail: z.string().email('잘못된 이메일 형식입니다.'),
  name: z.string().min(1, '이름은 필수 입력입니다.'),
  phoneNumber: z
    .string()
    .min(1, '휴대전화 번호는 필수 입력입니다.')
    .regex(/^[0-9]*$/, '숫자만 입력하세요.'),
  years: z
    .string()
    .min(1, '연차는 필수 입력입니다.')
    .regex(/^[0-9]*$/, '숫자만 입력하세요.'),
  careers: z.array(
    z.object({
      content: z.string(),
    })
  ),
});

export type MentorInfoForm = z.infer<typeof schema>;

export default function MentorForm() {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<MentorInfoForm>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      careers: [
        {
          content: '',
        },
      ],
    },
  });

  return (
    <form className="pt-6 pb-10">
      <section className="space-y-4">
        <WrapLabel label="이름(실명)" id="name" errorMessage={errors.name?.message} required>
          <TextInput id="name" register={register('name')} type="text" placeholder="실명을 입력해주세요."></TextInput>
        </WrapLabel>
        <WrapLabel label="연락처" id="phoneNumber" errorMessage={errors.phoneNumber?.message} required>
          <TextInput id="phoneNumber" register={register('phoneNumber')} type="text" placeholder="-를 제외하고 입력해주세요."></TextInput>
        </WrapLabel>
        <WrapLabel label="희망 분야 선택" id="field" required>
          <FieldInput></FieldInput>
        </WrapLabel>

        <WrapLabel
          label="회사 이메일"
          id="companyEmail"
          errorMessage={errors.companyEmail?.message}
          moreInfo="근무하시는 회사 이메일로 입력해주세요. 위 이메일로 근무사실을 검증합니다."
          required
        >
          <TextInput
            id="company_email"
            register={register('companyEmail')}
            type="text"
            placeholder="회사 이메일을 입력해주세요."
          ></TextInput>
        </WrapLabel>
        <WrapLabel label="경력 사항" id="careers" required moreInfo="한 개 이상의 경력 사항은 필수입니다.">
          <CareersInput
            name="careers"
            register={register}
            control={control}
            placeholder="가장 최근 경력부터 작성해주세요."
            buttonText="경력 사항 추가하기"
          ></CareersInput>
        </WrapLabel>
        <WrapLabel label="연차" id="years" required errorMessage={errors.years?.message}>
          <TextInput id="years" register={register('years')} type="number" placeholder="연차를 입력해주세요."></TextInput>
        </WrapLabel>
      </section>
      <section className="flex items-center justify-center pb-5 pt-10">
        <button className="rounded-full bg-lightPurple px-8 py-2 text-lg text-darkWhite" type="submit">
          다음 단계
        </button>
      </section>
    </form>
  );
}
