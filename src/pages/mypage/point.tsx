import MypageCase from '@/components/mypage/MypageCase';
import useCurrentUser from '@/hooks/useCurrentUser';

const point = () => {
  const currentUser = useCurrentUser();

  return (
    <MypageCase>
      <div>
        {/* 포인트 정보 확인 */}
        <div className="text-[1.05rem] text-darkGray">
          <span className="pr-4 text-lg font-semibold">{currentUser?.nickName}</span> 님의 포인트는 <br className="xs:hidden"></br>
          <span className="mr-2 mt-2 inline-block w-32 border border-lightGray py-0.5 pr-2 text-right text-gray xs:ml-2 xs:mt-0">
            15,000
          </span>{' '}
          P입니다.
        </div>
        {/* 포인트 관련 행위 일단 구현 안함. */}
        <div className="space-y-3 pt-6 text-darkGray">
          <div>포인트내역확인하기</div>
          <div>포인트충전하기</div>
          <div>포인트반환하기</div>
        </div>
      </div>
    </MypageCase>
  );
};

export default point;
