import MypageCase from '@/components/mypage/MypageCase';
import { FaceFrownIcon } from '@heroicons/react/20/solid';

const storedMentoring = [];

const mypageStore = () => {
  return (
    <MypageCase>
      {storedMentoring.length == 0 ? (
        <div className="flex h-56 flex-col items-center justify-center rounded-md">
          <FaceFrownIcon className="h-32 w-32 text-lightGray"></FaceFrownIcon>
          <p className="pt-10 text-xl text-darkGray">찜한 멘토링이 없습니다.</p>
        </div>
      ) : (
        <div></div>
      )}
    </MypageCase>
  );
};

export default mypageStore;
