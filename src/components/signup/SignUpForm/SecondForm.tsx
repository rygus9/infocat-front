import WrapLabel from '../../shared/input/WrapLabel';
import TextInput from '@/components/shared/input/TextInput';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import joinInfoAtom from '@/recoil/form/joinAtom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from 'react-query';
import signUpApi from '@/api/auth/signUpApi';
import { useState } from 'react';
import emailValidationApi from '@/api/email/emailValidationApi';
import { getErrorMessage } from '@/contents/errorMessage';
import emailSendApi from '@/api/email/emailSendApi';
import Button from '@/components/shared/common/Button';

interface SecondForm {
  backStep: () => void;
  finalStep: () => void;
}

export default function SecondForm({ backStep, finalStep }: SecondForm) {
  const { mutateAsync: signUpMutate, isLoading: signUpLoading } = useMutation(signUpApi);
  const { mutateAsync: emailValidationMutate, isLoading: emailValidationLoading } = useMutation(emailValidationApi);
  const { mutateAsync: emailSendMutate, isLoading: emailSendLoading } = useMutation(emailSendApi);
  const joinInfo = useRecoilValue(joinInfoAtom);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<{ validationCode: string }>({
    resolver: zodResolver(
      z.object({
        validationCode: z.string().min(1, '인증 코드는 필수 입력입니다.'),
      })
    ),
  });

  const onSubmit = async (data: { validationCode: string }) => {
    let validationToken = '';
    try {
      const result = await emailValidationMutate({ email: joinInfo.email, validationCode: data.validationCode });
      validationToken = result.validationToken;
    } catch (errorCode) {
      setError('validationCode', { message: getErrorMessage(errorCode as string) });
      return;
    }
    console.log(validationToken);
    const signUp = await signUpMutate({
      email: joinInfo.email,
      nickname: joinInfo.nickName,
      password: joinInfo.aboutPassword.password,
      validationToken,
    });
    if (!signUp) return;
    finalStep();
  };

  const onError = () => {};

  const onRetry = async () => {
    await emailSendMutate({ email: joinInfo.email });
  };

  return (
    <>
      <header>
        <h2 className="text-gray-800 text-center text-[1.6rem] md:text-3xl">회원가입</h2>
        <p className="text-gray-600  pt-2 text-center text-base">
          <span className="pr-1 font-bold text-darkPurPle">INFO CAT</span>에서 커리어를 준비하세요
        </p>
      </header>
      <form className="pt-10 pb-10" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="text-gray-500 rounded-md border border-purple-500 px-5 py-2">
          <p>
            현재 입력하신 이메일은 <span className="text-purple-500">{joinInfo.email}</span>입니다.
          </p>
          <p>입력하신 이메일로 인증 코드를 발급하였습니다.</p>
        </div>
        <section className="space-y-4 pt-6">
          <WrapLabel label="이메일 인증" id="validationCode" errorMessage={errors.validationCode?.message}>
            <div className="flex h-fit items-stretch space-x-2">
              <TextInput
                id="validationCode"
                register={register('validationCode')}
                type="text"
                placeholder="인증 코드를 입력하세요."
              ></TextInput>
              <Button type="button" btnStyle="inputBtn" onClick={onRetry} disabled={emailSendLoading}>
                {emailSendLoading ? '전송중...' : '재전송'}
              </Button>
            </div>
          </WrapLabel>
        </section>
        <div className="flex items-center justify-center space-x-2 pt-10">
          <Button type="button" btnStyle="submitSub" onClick={backStep}>
            이전단계
          </Button>
          <Button type="submit" btnStyle="submitMain">
            회원가입
          </Button>
        </div>
      </form>
    </>
  );
}
