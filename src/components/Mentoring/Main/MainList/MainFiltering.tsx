import PopTransition from '@/components/shared/common/PopTransition';
import cls from '@/utils/cls';
import { Menu, Popover } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { PropsWithChildren } from 'react';

export default function MainFiltering() {
  return (
    <section className="px-10">
      <header className="flex items-center justify-center pt-12 pb-6">
        <div className="relative w-fit">
          <input
            className={cls(
              'h-fit w-96 rounded-sm border border-gray-500 py-1.5 pl-3 text-lg',
              'focus:outline-none focus:ring-1 focus:ring-black'
            )}
            placeholder="제목을 입력해주세요."
          ></input>
          <MagnifyingGlassIcon className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2" />
        </div>
      </header>
      <div className="pb-7">
        <CategoryFiltering />
      </div>
      <div className="flex items-center justify-between">
        <span>총 80개의 멘토링</span>
        <OrderMenu />
      </div>
    </section>
  );
}

function CategoryFiltering() {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex items-center justify-center rounded-md border border-gray-400 bg-white px-3 py-1.5 text-gray-500">
            <span>카테고리 선택</span>
            <ChevronDownIcon className={cls('h-7 w-7 transition-transform', open ? 'rotate-180' : '')} aria-hidden="true" />
          </Popover.Button>
          <PopTransition>
            <Popover.Panel className="absolute left-0 mt-3 lg:max-w-3xl">
              <div className="grid w-fit grid-cols-3 divide-x rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <section className="p-5">
                  <h3 className="text-lg">멘토링 직무</h3>
                  <ul className="space-y-2 py-3 text-gray-500">
                    <li>IT/개발자</li>
                    <li>미디어/디자인</li>
                  </ul>
                </section>
                <section className="p-5"></section>
                <section className="p-5">
                  <h3 className="text-lg">멘토링 분야</h3>
                  <ul className="space-y-2 py-3 text-gray-500">
                    <li>자기소개서/이력서</li>
                    <li>면접</li>
                    <li>프트폴리오</li>
                    <li>인적성/필기</li>
                    <li>외국계 취업</li>
                  </ul>
                </section>
              </div>
            </Popover.Panel>
          </PopTransition>
        </>
      )}
    </Popover>
  );
}

function OrderMenu() {
  const orderCategory = ['인기순', '평점순', '등록순', '높은가격순', '낮은가격순'];

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button className="flex items-center justify-center">
            평점순 <ChevronUpIcon className={cls('h-7 w-7 transition-transform', open ? 'rotate-180' : '')}></ChevronUpIcon>
          </Menu.Button>
          <PopTransition>
            <Menu.Items
              as="ul"
              className="absolute right-0 mt-2 w-fit divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none"
            >
              {orderCategory.map((menu) => (
                <Menu.Item>
                  {({ active }) => (
                    <li
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } flex w-32 cursor-pointer items-center space-x-2 rounded-md px-2 py-2 text-sm`}
                    >
                      <input
                        type="checkbox"
                        className={cls(
                          'h-4 w-4 rounded-full text-purple-400',
                          'focus:appearance-none focus:outline-none focus:ring-0 focus:ring-offset-0'
                        )}
                      />
                      <span>{menu}</span>
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
