import { ResiterForm } from '.';
import { UseFormReturn } from 'react-hook-form/dist/types';
import TextInput from '@/components/shared/input/TextInput';
import WrapLabel from './WrapLabel';
import Button from '@/components/shared/common/Button';

interface FirstForm {
  method: UseFormReturn<ResiterForm, any>;
  nextStep: () => void;
}

export default function FirstForm({ method, nextStep }: FirstForm) {
  const { register } = method;

  return (
    <form className="pt-6 pb-10">
      <section className="space-y-4">
        <WrapLabel label="이메일" id="email">
          <TextInput id="email" register={register('email')} type="email" placeholder="인증을 진행할 이메일을 입력하세요."></TextInput>
        </WrapLabel>
        <WrapLabel label="닉네임" id="nickName">
          <TextInput id="nickName" register={register('nickName')} type="text" placeholder="닉네임을 입력하세요."></TextInput>
        </WrapLabel>
        <WrapLabel label="비밀번호" id="password">
          <TextInput id="password" register={register('password')} type="password" placeholder="비밀번호를 입력하세요."></TextInput>
        </WrapLabel>
        <WrapLabel label="비밀번호 확인" id="passwordValid">
          <TextInput id="passwordValid" register={register('passwordValid')} type="password" placeholder="비밀번호 확인"></TextInput>
        </WrapLabel>
      </section>
      <div className="flex items-center justify-center pt-10">
        <Button type="button" color="purple" buttonStyle="fill" size="w-full h-12 font-bold" onClick={nextStep}>
          다음단계
        </Button>
      </div>
    </form>
  );
}
