import TextInput from '@/components/shared/input/TextInput';
import WrapLabel from '../../shared/input/WrapLabel';
import Button from '@/components/shared/common/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRecoilState } from 'recoil';
import { z } from 'zod';
import joinInfoAtom from '@/recoil/atom/joinInfoAtom';
import { useMutation } from 'react-query';
import signUpValidationApi from '@/api/auth/signUpValidationApi';
import emailSendApi from '@/api/auth/emailSendApi';

interface FirstFormProps {
  nextStep: () => void;
}

const schema = z.object({
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

export type JoinInfoForm = z.infer<typeof schema>;

export default function FirstForm({ nextStep }: FirstFormProps) {
  const { mutateAsync: signUpMutate, isLoading: signUpLoading } = useMutation(signUpValidationApi);
  const { mutateAsync: emailMutate, isLoading: emailLoading } = useMutation(emailSendApi);

  const [joinInfo, setJoinInfo] = useRecoilState(joinInfoAtom);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<JoinInfoForm>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: joinInfo,
  });

  const onSubmit = async (data: JoinInfoForm) => {
    setJoinInfo(data);
    const signUpReturn = await signUpMutate({ email: data.email, password: data.aboutPassword.password, nickname: data.nickName });
    if (!signUpReturn) return;
    const emailReturn = await emailMutate({ email: data.email });
    if (!emailReturn) return;
    nextStep();
  };
  const onError = () => {};

  return (
    <form className="pt-6 pb-10" onSubmit={handleSubmit(onSubmit, onError)}>
      <section className="space-y-4">
        <WrapLabel label="이메일" id="email" errorMessage={errors.email?.message}>
          <TextInput id="email" register={register('email')} type="email" placeholder="인증을 진행할 이메일을 입력하세요."></TextInput>
        </WrapLabel>
        <WrapLabel label="닉네임" id="nickName" errorMessage={errors.nickName?.message}>
          <TextInput id="nickName" register={register('nickName')} type="text" placeholder="닉네임을 입력하세요."></TextInput>
        </WrapLabel>
        <WrapLabel label="비밀번호" id="password" errorMessage={errors.aboutPassword?.password?.message}>
          <TextInput
            id="password"
            register={register('aboutPassword.password')}
            type="password"
            placeholder="비밀번호를 입력하세요."
          ></TextInput>
        </WrapLabel>
        <WrapLabel label="비밀번호 확인" id="passwordValid" errorMessage={errors.aboutPassword?.passwordValid?.message}>
          <TextInput
            id="passwordValid"
            register={register('aboutPassword.passwordValid')}
            type="password"
            placeholder="비밀번호 확인"
          ></TextInput>
        </WrapLabel>
      </section>
      <div className="flex items-center justify-center pt-10">
        <Button type="submit" color="purple" buttonStyle="fill" size="w-full h-12 font-bold" isLoading={signUpLoading || emailLoading}>
          다음단계
        </Button>
      </div>
    </form>
  );
}
