import cls from '@/utils/cls';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { range } from 'rambda';
import useMentoringListQuery from '../hooks/useMentoringListQuery';
import MentoringCard, { LoadingCard } from './MentoringCard';
import PageNav from './PageNav';

export default function MentoringListSection() {
  const router = useRouter();
  const { page } = router.query;
  const { data: mentoringListQuery } = useMentoringListQuery(true);
  const mentoringList = mentoringListQuery?.content;

  return (
    <>
      {mentoringList?.length !== 0 ? (
        <MentoringCardContainer>
          <>
            {mentoringList?.map((elem) => (
              <div key={elem.id}>
                <MentoringCard {...elem} />
              </div>
            ))}
          </>
        </MentoringCardContainer>
      ) : (
        <section className={cls('h-fit w-full pb-10')}>
          <div className="flex items-center justify-center pt-10">
            <ExclamationCircleIcon className="h-20 w-20 text-darkGray"></ExclamationCircleIcon>
          </div>
          <h2 className="pt-6 text-center text-2xl text-darkGray">검색 결과가 없습니다.</h2>
          <ul className="pt-8 text-center text-lg leading-[24px] text-gray">
            <p>제목이 잘 기억나지 않으시다면</p>
            <p>다른 검색 조건을 이용해보는건 어떨까요?</p>
          </ul>
        </section>
      )}

      <nav className="pb-20 pt-10">
        <PageNav pageNum={page === undefined ? 1 : parseInt(page as string)} endPage={12}></PageNav>
      </nav>
    </>
  );
}

export function LoadingMentoringListSection() {
  return (
    <>
      <MentoringCardContainer>
        <>
          {range(0, 6).map((count) => (
            <LoadingCard key={count}></LoadingCard>
          ))}
        </>
      </MentoringCardContainer>
      <div className="pb-20 pt-10 text-center text-darkGray">로딩 중...</div>
    </>
  );
}

function MentoringCardContainer({ children }: { children: JSX.Element }) {
  return (
    <section
      className={cls(
        'm-auto grid w-full grid-cols-1 gap-4 py-0 px-4 pt-3',
        'xs:grid-cols-2 xs:gap-2 xs:px-6',
        'sm:gap-5',
        'md:grid-cols-3 md:gap-2',
        'lg:gap-4',
        'xl:gap-5'
      )}
    >
      {children}
    </section>
  );
}
