import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TextInput from '../shared/input/TextInput';
import WrapLabel from '../shared/input/WrapLabel';

const schema = z.object({
  company_email: z.string().email('잘못된 이메일 형식입니다.'),
  career: z.string().array().optional(),
  years: z.number(),
  company: z.string().optional(),
  role: z.string(),
});

export type MentorInfoForm = z.infer<typeof schema>;

export default function MentorForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<MentorInfoForm>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  return (
    <form className="pt-6 pb-10">
      <section className="space-y-4">
        <WrapLabel label="직장" id="company" errorMessage={errors.company?.message} moreInfo="선택 입력 사항입니다.">
          <TextInput id="company" register={register('company')} type="text" placeholder="직장명을 입력하세요."></TextInput>
        </WrapLabel>
        <WrapLabel label="회사 이메일" id="company_email" errorMessage={errors.company_email?.message} moreInfo="선택 입력 사항입니다.">
          <TextInput
            id="company_email"
            register={register('company_email')}
            type="text"
            placeholder="회사 이메일을 입력하세요."
          ></TextInput>
        </WrapLabel>
      </section>
    </form>
  );
}
