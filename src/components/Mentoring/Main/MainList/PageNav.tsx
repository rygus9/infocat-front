import { Fragment, PropsWithChildren } from 'react';
import { add, filter, map, pipe, range, subtract } from 'rambda';
import { ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import cls from '@/utils/cls';
import { useRouter } from 'next/router';
import removeUndefined from '@/utils/removeUndefined';
const SHOW_PAGE = 5;

interface PageNavProps {
  pageNum: number;
  endPage: number;
}

export default function PageNav({ pageNum, endPage }: PageNavProps) {
  const router = useRouter();
  const pageClick = (idx: number) => () =>
    idx !== 1
      ? router.replace({
          query: { ...router.query, page: idx },
        })
      : router.replace({
          query: removeUndefined({ ...router.query, page: undefined }),
        });

  const prevClick = () => {
    const nowPage = router.query.page;
    if (nowPage === '2') {
      router.replace({
        query: removeUndefined({ ...router.query, page: undefined }),
      });
    } else {
      router.replace({
        query: { ...router.query, page: parseInt(nowPage as string) - 1 },
      });
    }
  };

  const nextClick = () => {
    const nowPage = router.query.page;
    if (!nowPage) {
      router.replace({
        query: { ...router.query, page: 2 },
      });
    } else {
      router.replace({
        query: { ...router.query, page: parseInt(nowPage as string) + 1 },
      });
    }
  };

  const pages = endPage - pageNum < 5 ? range(endPage - 4, endPage + 1) : PageNums(pageNum, endPage);

  return (
    <section className="flex items-center justify-center space-x-2">
      {/* 처음 부분 */}
      <PageButton onClick={prevClick} disabled={pageNum === 1}>
        <ChevronLeftIcon className="h-10 w-10"></ChevronLeftIcon>
      </PageButton>
      {share(pageNum - 1, SHOW_PAGE) !== 0 && (
        <>
          <PageButton onClick={pageClick(1)}>1</PageButton>
          <PageButton onClick={pageClick(pages[0] - 1)}>
            <EllipsisHorizontalIcon className="h-5 w-5" />
          </PageButton>
        </>
      )}

      {/* 중간 다섯 개 */}
      {pages
        .filter((page) => page >= 1)
        .map((page) => (
          <Fragment key={page}>
            {page === pageNum ? <PageButton highlight>{page}</PageButton> : <PageButton onClick={pageClick(page)}>{page}</PageButton>}
          </Fragment>
        ))}

      {/* 마지막 부분 */}
      {endPage - pageNum >= 5 && (
        <>
          <PageButton onClick={pageClick(pages[4] + 1)}>
            <EllipsisHorizontalIcon className="h-5 w-5" />
          </PageButton>
          <PageButton onClick={pageClick(endPage)}>{endPage}</PageButton>
        </>
      )}
      <PageButton onClick={nextClick} disabled={pageNum === endPage}>
        <ChevronRightIcon className="h-10 w-10"></ChevronRightIcon>
      </PageButton>
    </section>
  );
}

interface PageButton {
  onClick?: () => void;
  highlight?: boolean;
  disabled?: boolean;
}

function PageButton({ children, onClick, highlight, disabled }: PropsWithChildren<PageButton>) {
  return (
    <button
      type="button"
      className={cls(
        'flex h-8 w-8 items-center justify-center px-2 shadow-md',
        highlight ? 'bg-lightPurple text-white' : 'bg-white text-darkGray',
        disabled ? 'bg-transparent text-lightGray shadow-none' : ''
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function PageNums(pageNum: number, endPage: number) {
  return pipe(
    (pageNum: number) => subtract(pageNum, 1),
    (pageNum: number) => range(share(pageNum, SHOW_PAGE) * SHOW_PAGE, share(pageNum, SHOW_PAGE) * SHOW_PAGE + SHOW_PAGE),
    map(add(1)),
    filter((elem) => elem <= endPage)
  )(pageNum);
}

function share(divide: number, divider: number) {
  return parseInt((divide / divider).toString());
}
