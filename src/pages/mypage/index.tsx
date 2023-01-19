import MypageCase from '@/components/mypage/MypageCase';
import WrapLabelShort from '@/components/mypage/WrapLabelShort';
import Button from '@/components/shared/common/Button';
import TextArea from '@/components/shared/input/TextArea';
import Input from '@/components/shared/input/Input';
import useCurrentUser from '@/hooks/useCurrentUser';
import LocalStorage from '@/recoil/effect/localStorage';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  nickname: z.string().min(1, '닉네임은 필수 입력입니다.'),
  introduce: z.string(),
});

type MyProfileForm = z.infer<typeof schema>;

const MyProfile = () => {
  const currentUser = useCurrentUser();

  const { register, handleSubmit } = useForm<MyProfileForm>({
    defaultValues: {
      nickname: currentUser?.nickName,
    },
  });

  // mocking 용 추후 지워야 할 부분
  const email = LocalStorage.getItem('email') || 'rygus9@ajou.ac.kr';
  //

  return (
    <MypageCase>
      <div>
        {/* Profile Part */}
        <div className="flex items-center space-x-6">
          <figure>
            <div className="h-20 w-20 rounded-full bg-lightGray sm:h-32 sm:w-32"></div>
          </figure>
          <div className="flex flex-col justify-center">
            <span className="text-2xl text-darkGray">{currentUser?.nickName}</span>
            <span className="text-gray">{email}</span>
          </div>
        </div>

        {/* edit Part */}
        <div className="space-y-4 py-10">
          <WrapLabelShort label="닉네임 수정" htmlFor="nickname">
            <Input type="text" {...register('nickname')} placeholder="수정할 닉네임을 입력하세요."></Input>
          </WrapLabelShort>
          <div className="space-y-3">
            <label htmlFor="introduce" className="inline-block w-28 text-gray">
              자기 소개
            </label>
            <TextArea {...register('introduce')} placeholder="자기 소개를 입력하세요." rows={8}></TextArea>
          </div>
          <div className="flex w-full justify-center pt-5">
            <Button btnStyle="submitMain" type="submit">
              저장하기
            </Button>
          </div>
        </div>
      </div>
    </MypageCase>
  );
};

export default MyProfile;
