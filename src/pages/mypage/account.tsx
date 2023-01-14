import MypageCase from '@/components/mypage/MypageCase';
import WrapLabelShort from '@/components/mypage/WrapLabelShort';
import Button from '@/components/shared/common/Button';
import TextDisabledInput from '@/components/shared/input/TextDisabledInput';
import TextInput from '@/components/shared/input/TextInput';
import LocalStorage from '@/recoil/effect/localStorage';
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

  // mocking 용 추후 지워야할 부분
  const email = LocalStorage.getItem('email') || 'rygus9@ajou.ac.kr';
  //

  return (
    <MypageCase>
      <div>
        {/* just show Eamil */}
        <div>
          <WrapLabelShort label="이메일" htmlFor="email">
            <TextDisabledInput value={email}></TextDisabledInput>
          </WrapLabelShort>
        </div>
        {/* change password */}
        <hr className="my-5 text-lightGray"></hr>
        <div>
          <h4 className="pb-4 text-lg text-darkGray">비밀번호 변경</h4>
          <form className="space-y-3">
            <WrapLabelShort label="현재 비밀번호" htmlFor="nowPassword">
              <TextInput type="password" register={register('nowPassword')} placeholder="현재 비밀번호를 입력하세요."></TextInput>
            </WrapLabelShort>
            <WrapLabelShort label="변경할 비밀번호" htmlFor="changedPassword">
              <TextInput type="password" register={register('changedPassword')} placeholder="변경할 비밀번호를 입력하세요."></TextInput>
            </WrapLabelShort>
            <WrapLabelShort label="비밀번호 확인" htmlFor="confirmPassword">
              <TextInput type="password" register={register('confirmPassword')} placeholder="비밀번호 확인"></TextInput>
            </WrapLabelShort>
            <div className="pt-2">
              <Button btnStyle="controlMain" type="submit">
                변경하기
              </Button>
            </div>
          </form>
        </div>
        {/* 화원 탈퇴하기 */}
        <hr className="my-5 text-lightGray"></hr>
        <div className="flex items-center">
          <h4 className="w-28 text-lg text-darkGray">회원 탈퇴</h4>
          <Button btnStyle="controlSub" type="button">
            회원 탈퇴
          </Button>
        </div>
      </div>
    </MypageCase>
  );
};

export default account;
