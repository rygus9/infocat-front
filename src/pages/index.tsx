import SearchComponent from '@/components/Mentoring/main/common/SearchComponent';
import usePathPush from '@/hooks/useReplace';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const onMentoringGo = usePathPush('/mentoring');

  return (
    <main>
      {/* 배너 이미지 파트 */}
      <header className="relative">
        <figure className="h-80 w-full xs:h-96">
          <img src="/image/main/banner.jpg" className="h-full w-full object-cover"></img>
        </figure>
        <section className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-center text-2xl text-darkGray xs:text-3xl">지금 바로 참여할 수 있습니다.</h1>
          <p className="pt-2 text-center text-base text-darkGray xs:text-lg">멘토에게 궁금한 것을 물어보세요</p>
          <div className="flex w-full justify-center pt-6">
            <button className="rounded-full bg-white px-4 py-1.5 text-darkGray shadow-custom" onClick={onMentoringGo}>
              멘토링 신청
            </button>
          </div>
        </section>
      </header>
      {/* 검색 섹션 */}
      <section>
        <div className="flex flex-col items-stretch justify-center py-12 px-4 xs:py-16 md:flex-row md:items-center md:space-x-16 md:py-20 md:px-10 lg:space-x-32">
          <section className="flex flex-1 flex-col items-center md:items-end">
            <div>
              <h3 className="text-xl font-semibold text-darkGray xs:text-2xl">
                <p>인포켓이</p> <p>당신의 취업준비부터 성공까지 함께 합니다</p>
              </h3>
              <p className="pt-2 text-base text-darkGray xs:pt-4">궁금한 모든 것을 질문해보세요.</p>
            </div>
          </section>
          <section className="flex-1 pt-10 md:pt-0">
            <div className="m-auto w-full max-w-sm xs:max-w-md md:m-0">
              <SearchComponent></SearchComponent>
            </div>
          </section>
        </div>
        <hr className="my-5 text-lightGray shadow-custom"></hr>
      </section>
    </main>
  );
};

export default Home;
