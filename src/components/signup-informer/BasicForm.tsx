import emailValidationApi from '@/api/email/emailValidationApi';
import emailSendApi from '@/api/email/emailSendApi';
import useCurrentUser from '@/hooks/useCurrentUser';
import basicFormAtom from '@/recoil/form/informerRegist/basicFormAtom';
import cls from '@/utils/cls';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { z } from 'zod';
import Input from '../shared/input/Input';
import WrapLabel from '../shared/input/WrapLabel';
import emailCompanyApi from '@/api/auth/emailCompanyApi';
import companyAtom from '@/recoil/form/informerRegist/companyAtom';
import { useState } from 'react';
import { getErrorMessage } from '@/contents/errorMessage';
import Button from '../shared/common/Button';
import { BasicFormValidation } from '@/contents/validation/signUpInformerFormValidation';

export type BasicFormType = z.infer<typeof BasicFormValidation>;

interface BasicFormProps {
  onNext: () => void;
}

export default function BasicForm({ onNext }: BasicFormProps) {
  const userState = useCurrentUser();
  const { mutateAsync: emailSendMutate, status: emailSendStatus } = useMutation(emailSendApi);
  const { mutateAsync: emailValidationMutate, status: emailValidationStatus } = useMutation(emailValidationApi);
  const { mutateAsync: emailCompanyMutate } = useMutation(emailCompanyApi);
  const setCompany = useSetRecoilState(companyAtom);
  const [basicFormState, setBasicFormState] = useRecoilState(basicFormAtom);
  const [emailValidationError, setEmailValidationError] = useState('');

  const {
    getValues,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<BasicFormType>({
    resolver: zodResolver(BasicFormValidation),
    mode: 'onChange',
    defaultValues: basicFormState,
  });

  const onSubmit = async (data: BasicFormType) => {
    try {
      await emailValidationMutate({ email: data.companyEmail, validationCode: data.emailCode });
      const company = await emailCompanyMutate({ email: data.companyEmail });
      setCompany(company);
    } catch (err) {
      setEmailValidationError(getErrorMessage(err as string));
      return;
    }
    setBasicFormState(data);
    onNext();
  };

  const emailSend = async () => {
    const email = getValues('companyEmail');
    await emailSendMutate({ email: email });
  };

  return (
    <>
      <header className="pt-20 pb-1">
        <h3 className="w-fit space-y-1 text-left text-xl text-darkGray xs:text-2xl">
          <p>{userState?.nickName} 님 안녕하세요.</p>
          <p>인포머에 동참해주셔서 감사합니다.</p>
        </h3>
      </header>
      <form className="pt-6 pb-10" onSubmit={handleSubmit(onSubmit)}>
        <section className="space-y-4">
          <WrapLabel label="이름(실명)" id="name" errorMessage={errors.name?.message} required>
            <Input id="name" {...register('name')} type="text" placeholder="실명을 입력해주세요."></Input>
          </WrapLabel>
          <WrapLabel label="연락처" id="phone" errorMessage={errors.phone?.message} required>
            <Input id="phone" {...register('phone')} type="text" placeholder="-를 제외하고 입력해주세요."></Input>
          </WrapLabel>
          <WrapLabel
            label="회사 이메일"
            id="companyEmail"
            errorMessage={errors.companyEmail?.message || errors.emailCode?.message}
            moreInfo="근무하시는 회사 이메일로 입력해주세요. 위 이메일로 근무사실을 검증합니다."
            required
          >
            <div
              className={cls('flex items-stretch space-x-2', emailSendStatus === 'error' || emailSendStatus === 'success' ? '' : 'mb-2')}
            >
              <Input id="companyEmail" {...register('companyEmail')} type="text" placeholder="회사 이메일을 입력해주세요."></Input>
              <Button btnStyle="inputBtn" onClick={emailSend} type="button">
                {emailSendStatus === 'loading' ? '전송중' : '전송'}
              </Button>
            </div>
            {emailSendStatus === 'error' && <span className="mb-2 inline-block text-sm text-red-500">이메일 전송에 실패했습니다.</span>}
            {emailSendStatus === 'success' && (
              <span className="mb-2 inline-block text-sm text-lightPurple">인증 코드가 전송되었습니다.</span>
            )}
            <Input id="emailCode" {...register('emailCode')} placeholder="인증 코드를 입력해주세요." type="text"></Input>
            {emailValidationStatus === 'error' && <span className="inline-block text-sm text-red-500">{emailValidationError}</span>}
          </WrapLabel>
        </section>
        <section className="flex items-center justify-center pb-5 pt-10">
          <Button btnStyle="submitMain" type="submit">
            {isSubmitting ? '등록 중' : '다음 단계'}
          </Button>
        </section>
      </form>
    </>
  );
}
