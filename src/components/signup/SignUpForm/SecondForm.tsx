import WrapLabel from '../../shared/input/WrapLabel';
import TextInput from '@/components/shared/input/TextInput';
import Button from '@/components/shared/common/Button';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import joinInfoAtom from '@/recoil/atom/joinInfoAtom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from 'react-query';
import signUpApi from '@/api/auth/signUpApi';
import { useState } from 'react';
import emailValidationApi from '@/api/auth/emailValidationApi';

interface SecondForm {
  backStep: () => void;
}

export default function SecondForm({ backStep }: SecondForm) {
  const { mutateAsync: signUpMutate, isLoading: signUpLoading } = useMutation(signUpApi);
  const { mutateAsync: emailValidationMutate, isLoading: emailValidationloading } = useMutation(emailValidationApi);
  const joinInfo = useRecoilValue(joinInfoAtom);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ validationCode: string }>({
    resolver: zodResolver(
      z.object({
        validationCode: z.string().min(1, '인증 코드는 필수 입력입니다.'),
      })
    ),
  });
  const onSubmit = async (data: { validationCode: string }) => {
    const emailValidation = await emailValidationMutate({ email: joinInfo.email, validationCode: data.validationCode });
    if (!emailValidation) return;
    const signUp = await signUpMutate({
      email: joinInfo.email,
      nickname: joinInfo.nickName,
      password: joinInfo.aboutPassword.password,
      validationToken: emailValidation.validationToken,
    });
    if (!signUp) return;
    setShowModal(true);
  };
  const onError = () => {};

  return (
    <>
      <form className="pt-10 pb-10" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="rounded-md border border-purple-500 px-5 py-2 text-gray-500">
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
              <Button color="gray" buttonStyle="border" type="button" size="w-20">
                전송
              </Button>
            </div>
          </WrapLabel>
        </section>
        <div className="flex items-center justify-center space-x-2 pt-10">
          <Button type="button" color="purple" buttonStyle="border" size="w-full h-12" onClick={backStep}>
            이전단계
          </Button>
          <Button type="submit" color="purple" buttonStyle="fill" size="w-full h-12 font-bold">
            회원가입
          </Button>
        </div>
      </form>
      {showModal}
    </>
  );
}
