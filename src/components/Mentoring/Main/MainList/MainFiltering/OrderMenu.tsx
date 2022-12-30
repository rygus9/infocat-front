import PopTransition from '@/components/shared/common/PopTransition';
import cls from '@/utils/cls';
import { Menu } from '@headlessui/react';
import { CheckIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

const orderCategory = [
  {
    value: 'recent',
    name: '등록순',
  },
  {
    value: 'popular',
    name: '인기순',
  },
  {
    value: 'stars',
    name: '평점순',
  },
  {
    value: 'high_price',
    name: '높은가격순',
  },
  {
    value: 'low_price',
    name: '낮은가격순',
  },
];

export default function OrderMenu() {
  const router = useRouter();
  let { sorted } = router.query;
  if (!sorted) sorted = 'recent';

  const onMenuClick = (menu: string) => () => {
    router.replace({
      query: {
        ...router.query,
        sorted: menu,
      },
    });
  };

  return (
    <Menu as="div" className="relative inline-block text-left text-darkGray">
      {({ open }) => (
        <>
          <Menu.Button className="flex items-center justify-center">
            {orderCategory.filter((menu) => menu.value === sorted)[0].name}
            <ChevronUpIcon className={cls('ml-1 h-5 w-5 transition-transform', open ? 'rotate-180' : '')}></ChevronUpIcon>
          </Menu.Button>
          <PopTransition>
            <Menu.Items as="ul" className="absolute right-0 z-20 mt-1 w-fit rounded-md bg-white shadow-lg focus:outline-none">
              {orderCategory.map((menu) => (
                <Menu.Item key={menu.value}>
                  {({ active }) => (
                    <li
                      className={cls(
                        active ? 'border-none bg-violet-500 text-white' : 'text-gray-900',
                        'flex w-32 cursor-pointer items-center space-x-1 rounded-md px-4 py-2.5 text-sm'
                      )}
                      onClick={onMenuClick(menu.value)}
                    >
                      {sorted === menu.value ? (
                        <CheckIcon className={cls('h-4 w-4', active ? 'text-white' : 'text-darkPurPle')} />
                      ) : (
                        <div className="h-4 w-4"></div>
                      )}
                      <span>{menu.name}</span>
                    </li>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </PopTransition>
        </>
      )}
    </Menu>
  );
}
