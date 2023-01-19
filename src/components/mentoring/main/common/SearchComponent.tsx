import cls from '@/utils/cls';
import removeUndefined from '@/utils/removeUndefined';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SearchComponent() {
  const router = useRouter();
  const nowTitle = router.query.title;
  const [title, setTitle] = useState(nowTitle);
  const onTitleSetQuery = () => {
    if (router.route === '/mentoring') {
      router.replace({
        query: removeUndefined({
          ...router.query,
          title: title,
          page: undefined,
        }),
      });
    } else {
      router.push({
        pathname: '/mentoring',
        query: removeUndefined({
          title: title,
          page: undefined,
        }),
      });
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        className={cls(
          'h-fit w-full border-2 border-darkGray py-1.5 pl-3 pr-10 text-lg text-darkGray',
          'placeholder:text-gray focus:outline-none focus:ring-1 focus:ring-gray'
        )}
        placeholder="제목을 입력해주세요."
        value={title || ''}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => (e.code === 'Enter' ? onTitleSetQuery() : '')}
      ></input>
      <MagnifyingGlassIcon
        className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-darkGray [&>path]:stroke-[2.5]"
        onClick={() => onTitleSetQuery()}
      />
    </div>
  );
}
