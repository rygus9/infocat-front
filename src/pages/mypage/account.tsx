import MypageCase from '@/components/mypage/MypageCase';
import TextDisabledInput from '@/components/shared/input/TextDisabledInput';
import TextInput from '@/components/shared/input/TextInput';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  nowPassword: z.string().min(1, '닉네임은 필수 입력입니다.'),
  changedPassword: z.string(),
  confirmPassword: z.string(),
});

type PasswordTransitionFrom = z.infer<typeof schema>;

const account = () => {
  const { register, handleSubmit } = useForm<PasswordTransitionFrom>({});

  return (
    <MypageCase>
      <div>
        {/* just show Eamil */}
        <div>
          <div className="flex w-96 items-center">
            <label htmlFor="nickname" className="w-28 flex-shrink-0 text-gray">
              이메일
            </label>
            <TextDisabledInput value="rygus9@naver.com"></TextDisabledInput>
          </div>
        </div>
        {/* change password */}
        <hr className="my-5 text-lightGray"></hr>
        <div>
          <h4 className="pb-4 text-lg text-darkGray">비밀번호 변경</h4>
          <form className="space-y-3">
            <div className="flex w-96 items-center">
              <label htmlFor="nowPassword" className="inline-block w-28 flex-shrink-0 text-gray">
                현재 비밀번호
              </label>
              <TextInput type="text" register={register('nowPassword')} placeholder="수정할 닉네임을 입력하세요."></TextInput>
            </div>
            <div className="flex w-96 items-center">
              <label htmlFor="changedPassword" className="block w-28 flex-shrink-0 text-gray">
                변경할 비밀번호
              </label>
              <TextInput type="text" register={register('changedPassword')} placeholder="수정할 닉네임을 입력하세요."></TextInput>
            </div>
            <div className="flex w-96 items-center">
              <label htmlFor="confirmPassword" className="block w-28 flex-shrink-0 text-gray">
                비밀번호 확인
              </label>
              <TextInput type="text" register={register('confirmPassword')} placeholder="수정할 닉네임을 입력하세요."></TextInput>
            </div>
          </form>
        </div>
        {/* 화원 탈퇴하기 */}
        <hr className="my-5 text-lightGray"></hr>
        <div className="flex items-center">
          <h4 className="w-28 text-lg text-darkGray">회원 탈퇴</h4>
          <button className="rounded-full bg-darkWhite px-4 py-1 text-base text-darkGray" type="button">
            회원 탈퇴
          </button>
        </div>
      </div>
    </MypageCase>
  );
};

export default account;
