import { ResiterForm } from '.';
import { UseFormReturn } from 'react-hook-form/dist/types';
import WrapLabel from '../../shared/input/WrapLabel';
import TextInput from '@/components/shared/input/TextInput';
import Button from '@/components/shared/common/Button';

interface SecondForm {
  method: UseFormReturn<ResiterForm, any>;
  backStep: () => void;
}

export default function SecondForm({ method, backStep }: SecondForm) {
  const { register, getValues } = method;

  return (
    <form className="pt-10 pb-10">
      <div className="rounded-md border border-purple-500 px-5 py-2 text-gray-500">
        <p>
          현재 입력하신 이메일은 <span className="text-purple-500">{getValues('email')}</span>입니다.
        </p>
        <p>입력하신 이메일로 인증 코드를 발급하였습니다.</p>
      </div>
      <section className="space-y-4 pt-6">
        <WrapLabel label="이메일 인증" id="validationCode">
          <div className="flex h-fit items-stretch space-x-2">
            <TextInput
              id="validationCode"
              register={register('validationCode')}
              type="text"
              placeholder="인증 코드를 입력하세요."
            ></TextInput>
            <Button color="gray" buttonStyle="border" type="button" size="w-20">
              재전송
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
  );
}
