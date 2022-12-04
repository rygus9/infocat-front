import cls from '@/utils/cls';
import removeUndefined from '@/utils/removeUndefined';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CategoryFiltering from './CategoryFiltering';
import OrderMenu from './OrderMenu';

interface MainFilteringParams {
  totalNums: string;
}

export default function MainFiltering({ totalNums }: MainFilteringParams) {
  const [title, setTitle] = useState('');
  const router = useRouter();
  useEffect(() => {
    const { title } = router.query;
    setTitle((title ? title : '') as string);
  }, [router.query]);

  const onTitleSetQuery = () => {
    router.replace({
      query: removeUndefined({
        ...router.query,
        title: title,
      }),
    });
  };

  return (
    <section className="w-full px-4 xs:px-6">
      <header className="flex w-full items-center justify-center pt-12 pb-6">
        <div className="relative w-full max-w-md">
          <input
            className={cls('h-fit w-full border border-gray py-2 pl-3 pr-10 text-lg', 'focus:outline-none focus:ring-1 focus:ring-gray')}
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => (e.code === 'Enter' ? onTitleSetQuery() : '')}
          ></input>
          <MagnifyingGlassIcon className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-gray" onClick={() => onTitleSetQuery()} />
        </div>
      </header>
      <div className="w-full pb-5">
        <CategoryFiltering />
      </div>
      <div className="flex w-full items-center justify-between">
        <span className="text-sm text-darkGray">총 {totalNums}개의 멘토링</span>
        <OrderMenu />
      </div>
    </section>
  );
}
