import TextInput from '@/components/shared/input/TextInput';
import WrapLabel from '../../shared/input/WrapLabel';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRecoilState } from 'recoil';
import { z } from 'zod';
import joinInfoAtom from '@/recoil/form/joinAtom';
import { useMutation } from 'react-query';
import signUpValidationApi from '@/api/auth/signUpValidationApi';
import emailSendApi from '@/api/email/emailSendApi';
import { getErrorMessage } from '@/contents/errorMessage';
import Button from '@/components/shared/common/Button';
import { FirstFormValidation } from '@/contents/validation/signUpFormValidation';

interface FirstFormProps {
  nextStep: () => void;
}

export type JoinInfoForm = z.infer<typeof FirstFormValidation>;

export default function FirstForm({ nextStep }: FirstFormProps) {
  const { mutateAsync: signUpMutate, isLoading: signUpLoading } = useMutation(signUpValidationApi);
  const { mutateAsync: emailMutate, isLoading: emailLoading } = useMutation(emailSendApi);

  const [joinInfo, setJoinInfo] = useRecoilState(joinInfoAtom);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<JoinInfoForm>({
    resolver: zodResolver(FirstFormValidation),
    mode: 'onChange',
    defaultValues: joinInfo,
  });

  const onSubmit = async (data: JoinInfoForm) => {
    setJoinInfo(data);
    try {
      await signUpMutate({ email: data.email, password: data.aboutPassword.password, nickname: data.nickName });
    } catch (errorCode) {
      setError('email', { message: getErrorMessage(errorCode as string) });
      return;
    }
    const emailReturn = await emailMutate({ email: data.email });
    if (!emailReturn) return;
    nextStep();
  };
  const onError = () => {};

  return (
    <>
      <header>
        <h2 className="text-gray-800 text-center text-[1.6rem] md:text-3xl">회원가입</h2>
        <p className="text-gray-600  pt-2 text-center text-base">
          <span className="pr-1 font-bold text-darkPurPle">INFO CAT</span>에서 커리어를 준비하세요
        </p>
      </header>
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
          <Button type="submit" btnStyle="submitMain">
            {signUpLoading || emailLoading ? '로딩중' : '다음단계'}
          </Button>
        </div>
      </form>
    </>
  );
}
