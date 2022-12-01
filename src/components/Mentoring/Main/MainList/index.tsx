import mentoringListSearchApi from '@/api/mentoring/mentoringListSearchApi';
import cls from '@/utils/cls';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import MainFiltering from './MainFiltering';
import MentoringCard from './MentoringCard';
import PageNav from './PageNav';

export default function MainList() {
  const router = useRouter();
  const { page, category, sorted, field, title } = router.query;

  const { status, data } = useQuery({
    queryKey: [`mentoringList_${JSON.stringify(router.query)}`],
    queryFn: () =>
      mentoringListSearchApi({
        category,
        page,
        sorted: sorted || 'recent',
        field,
        title,
      }),
    onSuccess: () => {},
  });

  return (
    <main className="m-auto w-fit">
      {status === 'success' ? (
        <MainFiltering totalNums={data.totalElements}></MainFiltering>
      ) : (
        <MainFiltering totalNums=".."></MainFiltering>
      )}
      <section
        className={cls(
          'm-auto grid w-fit grid-cols-1 gap-4 py-0 px-4 pt-3',
          'xs:grid-cols-2 xs:gap-2 xs:px-6',
          'sm:gap-5',
          'md:grid-cols-3 md:gap-2',
          'lg:gap-4',
          'xl:gap-5'
        )}
      >
        {status === 'success' ? (
          data?.content.map((elem) => (
            <div key={elem.id}>
              <MentoringCard {...elem} />
            </div>
          ))
        ) : (
          <div>로딩중</div>
        )}
      </section>
      <nav className="pb-20 pt-5">
        {status === 'success' ? (
          <PageNav pageNum={page === undefined ? 1 : parseInt(page as string)} endPage={parseInt(data.totalPages)}></PageNav>
        ) : (
          <div></div>
        )}
      </nav>
    </main>
  );
}
