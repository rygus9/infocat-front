import MypageCase from '@/components/mypage/MypageCase';
import TextAreaInput from '@/components/shared/input/TextAreaInput';
import TextInput from '@/components/shared/input/TextInput';
import WrapLabel from '@/components/shared/input/WrapLabel';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  nickname: z.string().min(1, '닉네임은 필수 입력입니다.'),
  introduce: z.string(),
});

type MyProfileForm = z.infer<typeof schema>;

const MyProfile = () => {
  const { register, handleSubmit } = useForm<MyProfileForm>({});

  return (
    <MypageCase>
      <div>
        {/* Profile Part */}
        <div className="flex items-center space-x-6">
          <figure>
            <div className="h-32 w-32 rounded-full bg-lightGray"></div>
          </figure>
          <div className="flex flex-col justify-center">
            <span className="text-2xl text-darkGray">승꽁</span>
            <span className="text-gray">been0822@naver.com</span>
          </div>
        </div>

        {/* edit Part */}
        <div className="space-y-4 py-10">
          <div className="flex w-96 items-center space-x-3">
            <label htmlFor="nickname" className="inline-block w-28 text-gray">
              닉네임 수정
            </label>
            <TextInput type="text" register={register('nickname')} placeholder="수정할 닉네임을 입력하세요."></TextInput>
          </div>
          <div className="space-y-3">
            <label htmlFor="introduce" className="inline-block w-28 text-gray">
              자기 소개
            </label>
            <TextAreaInput register={register('introduce')} placeholder="자기 소개를 입력하세요." rows={8}></TextAreaInput>
          </div>
          <div className="flex w-full justify-center pt-5">
            <button className="rounded-full bg-lightPurple px-8 py-2 text-lg text-darkWhite" type="submit">
              저장하기
            </button>
          </div>
        </div>
      </div>
    </MypageCase>
  );
};

export default MyProfile;
