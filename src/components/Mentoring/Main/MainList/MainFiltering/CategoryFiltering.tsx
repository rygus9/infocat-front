import PopTransition from '@/components/shared/common/PopTransition';
import cls from '@/utils/cls';
import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';

const categoryOption = {
  'IT/개발자': [
    { name: 'SW 엔지니어', value: '101' },
    { name: 'QA 엔지니어', value: '102' },
    { name: '프론트엔드 엔지니어', value: '103' },
    { name: '서버 엔지니어', value: '104' },
    { name: '데이터 사이언티스트', value: '105' },
  ],
  '미디어/디자인': [{ name: 'UX/UI 디자이너', value: '201' }],
} as { [key: string]: { name: string; value: string }[] };

const fieldOption = [
  { name: '국내 자기소개서/이력서', value: '1' },
  { name: '국외 자기소개서/이력서', value: '2' },
  { name: '포트폴리오', value: '3' },
  { name: '면접', value: '4' },
];

interface FilterValue {
  category: string[];
  field: string[];
}

export default function CategoryFiltering() {
  const { register, handleSubmit, watch } = useForm<FilterValue>();
  const [majorCategory, setMajorCategory] = useState('');

  console.log(watch());
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
              <form>
                <div className="grid w-fit grid-cols-3 divide-x divide-lightGray rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <section className="p-5">
                    <h3 className="text-lg text-black">멘토링 직무</h3>
                    <ul className="text-gray-500 space-y-2 py-3 pl-3">
                      {Object.keys(categoryOption).map((name) => (
                        <li onClick={() => setMajorCategory(name)} key={name}>
                          {name}
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section className="p-5">
                    {majorCategory && (
                      <ul className="text-gray-500 space-y-2 py-3 pl-3">
                        {categoryOption[majorCategory].map((option) => (
                          <div key={option.value}>
                            <ToggleInput
                              label={option.name}
                              register={register('category')}
                              type="checkbox"
                              value={option.value}
                            ></ToggleInput>
                          </div>
                        ))}
                      </ul>
                    )}
                  </section>
                  <section className="p-5">
                    <h3 className="text-lg text-black">멘토링 분야</h3>
                    <ul className="text-gray-500 space-y-2 py-3 pl-3">
                      {fieldOption.map((option) => (
                        <div key={option.value}>
                          <ToggleInput label={option.name} register={register('field')} type="checkbox" value={option.value}></ToggleInput>
                        </div>
                      ))}
                    </ul>
                  </section>
                </div>
              </form>
            </Popover.Panel>
          </PopTransition>
        </>
      )}
    </Popover>
  );
}

interface ToggleInputProps {
  label: string;
  register: UseFormRegisterReturn;
  type?: 'checkbox' | 'radio';
  value?: string;
}

const ToggleInput = ({ label, register, type = 'checkbox', value }: ToggleInputProps) => {
  return (
    <div className="flex h-full items-center">
      <input
        type={type}
        id={label}
        {...register}
        className={cls('mr-4 h-5 w-5 cursor-pointer text-stone-700', 'focus:ring-1 focus:ring-stone-500')}
        value={value}
        tabIndex={0}
      ></input>
      <label htmlFor={label} className="cursor-pointer text-stone-700">
        {label}
      </label>
    </div>
  );
};
