import basicFormAtom from '@/recoil/form/informerRegist/basicFormAtom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { z } from 'zod';
import TextInput from '../shared/input/TextInput';
import WrapLabel from '../shared/input/WrapLabel';

const schema = z.object({
  companyEmail: z.string().email('잘못된 이메일 형식입니다.'),
  emailCode: z.string().min(1, '인증 코드는 필수입니다.'),
  name: z.string().min(1, '이름은 필수 입력입니다.'),
  phone: z
    .string()
    .min(1, '휴대전화 번호는 필수 입력입니다.')
    .regex(/^[0-9]*$/, '숫자만 입력하세요.'),
});

export type BasicFormType = z.infer<typeof schema>;

interface BasicFormProps {
  onNext: () => void;
}

export default function BasicForm({ onNext }: BasicFormProps) {
  const [basicFormState, setBasicFormState] = useRecoilState(basicFormAtom);
  console.log('렌더링 되냐.');

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<BasicFormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: basicFormState,
  });

  const onSubmit = (data: any) => {
    setBasicFormState(data);
    onNext();
  };

  return (
    <>
      <header className="pt-20 pb-1">
        <h3 className="w-fit space-y-1 text-left text-2xl text-darkGray">
          <p>이승연님 안녕하세요.</p>
          <p>인포머에 동참해주셔서 감사합니다.</p>
        </h3>
      </header>
      <form className="pt-6 pb-10" onSubmit={handleSubmit(onSubmit)}>
        <section className="space-y-4">
          <WrapLabel label="이름(실명)" id="name" errorMessage={errors.name?.message} required>
            <TextInput id="name" register={register('name')} type="text" placeholder="실명을 입력해주세요."></TextInput>
          </WrapLabel>
          <WrapLabel label="연락처" id="phone" errorMessage={errors.phone?.message} required>
            <TextInput id="phone" register={register('phone')} type="text" placeholder="-를 제외하고 입력해주세요."></TextInput>
          </WrapLabel>
          <WrapLabel
            label="회사 이메일"
            id="companyEmail"
            errorMessage={errors.companyEmail?.message}
            moreInfo="근무하시는 회사 이메일로 입력해주세요. 위 이메일로 근무사실을 검증합니다."
            required
          >
            <div className="mb-2 flex items-stretch space-x-2">
              <TextInput
                id="companyEmail"
                register={register('companyEmail')}
                type="text"
                placeholder="회사 이메일을 입력해주세요."
              ></TextInput>
              <button className="w-16 bg-lightPurple text-white">전송</button>
            </div>
            <TextInput id="emailCode" register={register('emailCode')} placeholder="인증 코드를 입력해주세요." type="text"></TextInput>
          </WrapLabel>
        </section>
        <section className="flex items-center justify-center pb-5 pt-10">
          <button className="rounded-full bg-lightPurple px-8 py-2 text-lg text-darkWhite" type="submit">
            다음 단계
          </button>
        </section>
      </form>
    </>
  );
}
