import PopTransition from '@/components/shared/common/PopTransition';
import cls from '@/utils/cls';
import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function CategoryFiltering() {
  return (
    <Popover className="relative text-gray">
      {({ open }) => (
        <>
          <Popover.Button className="text-gray-500 flex items-center justify-center rounded-md border border-lightGray bg-white px-4 py-2">
            <span className="text-sm text-gray">카테고리 선택</span>
            <ChevronDownIcon className={cls('ml-2 h-5 w-5 text-gray transition-transform', open ? 'rotate-180' : '')} aria-hidden="true" />
          </Popover.Button>
          <PopTransition>
            <Popover.Panel className="absolute left-0 z-10 mt-2 lg:max-w-3xl">
              <div className="grid w-fit grid-cols-3 divide-x divide-lightGray rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <section className="p-5">
                  <h3 className="text-lg text-black">멘토링 직무</h3>
                  <ul className="text-gray-500 space-y-2 py-3 pl-3">
                    <li>IT/개발자</li>
                    <li>미디어/디자인</li>
                  </ul>
                </section>
                <section className="p-5"></section>
                <section className="p-5">
                  <h3 className="text-lg text-black">멘토링 분야</h3>
                  <ul className="text-gray-500 space-y-2 py-3 pl-3">
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
