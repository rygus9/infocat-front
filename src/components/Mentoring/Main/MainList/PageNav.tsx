import { PropsWithChildren } from 'react';
import { add, filter, map, pipe, range, subtract } from 'rambda';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
const SHOW_PAGE = 5;

export default function PageNav() {
  let pageNum = 3;
  let endPage = 11;

  return (
    <section className="flex items-center justify-center space-x-2">
      {pageNum !== 1 && (
        <PageButton>
          <ChevronLeftIcon></ChevronLeftIcon>
        </PageButton>
      )}
      {share(pageNum - 1, SHOW_PAGE) !== 0 && (
        <>
          <PageButton>1</PageButton>
          <PageButton>...</PageButton>
        </>
      )}

      {PageNums(pageNum, endPage).map((elem) => (
        <PageButton key={elem}>{elem}</PageButton>
      ))}

      {share(pageNum - 1, SHOW_PAGE) * SHOW_PAGE + SHOW_PAGE < endPage && (
        <>
          <PageButton>...</PageButton>
          <PageButton>{endPage}</PageButton>
        </>
      )}
      {pageNum !== endPage && (
        <PageButton>
          <ChevronRightIcon></ChevronRightIcon>
        </PageButton>
      )}
    </section>
  );
}

function PageButton({ children }: PropsWithChildren) {
  return (
    <button type="button" className="flex h-8 w-8 items-center justify-center rounded-md bg-white px-2 text-gray-800 shadow-md">
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
