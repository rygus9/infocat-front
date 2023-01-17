import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { ForwardedRef, Fragment } from 'react';
import cls from '@/utils/cls';

interface ListBoxOption {
  [key: string]: any;
  title: string;
}

interface ListBoxProps {
  list: ListBoxOption[];
  value: ListBoxOption;
  onChange: (d: ListBoxOption) => void;
  id?: string;
  placeholder?: string;
}

export default function ListBoxInput({ list, id, placeholder, value, onChange }: ListBoxProps, ref: ForwardedRef<any>) {
  return (
    <Listbox value={value} onChange={onChange} as={Fragment}>
      <div className="relative">
        <Listbox.Button
          ref={(e: any) => {
            typeof ref === 'function' && ref(e);
          }}
          className={cls(
            'flex w-full border border-lightGray bg-white px-2.5 py-2 shadow-sm ',
            'text-base text-darkGray',
            'placeholder:text placeholder:text-lightBlack',
            'focus:border-darkPurPle focus:outline-none focus:ring-0'
          )}
          id={id}
        >
          <span className="flex-1 truncate text-left">{value && value.title ? value.title : placeholder}</span>
          <ChevronUpDownIcon className="text-gray-400 h-full w-6" aria-hidden="true" />
        </Listbox.Button>
        <Listbox.Options
          className={cls(
            'absolute z-20 mt-2 max-h-60 w-full overflow-scroll border border-lightGray bg-white shadow-md',
            'text-darkGray',
            'focus:border-lightGray focus:outline-none focus:ring-0'
          )}
        >
          {list.map((elem) => (
            <Listbox.Option
              key={elem.title}
              className={({ active }) => cls(active ? 'bg-darkWhite' : '', 'relative flex py-2 pl-2.5 pr-2 text-darkGray')}
              value={elem}
            >
              {({ active }) => (
                <>
                  <span
                    className={cls(
                      'block flex-1 truncate',
                      value && value.title === elem.title ? 'font-semibold text-darkPurPle' : 'font-normal'
                    )}
                  >
                    {elem.title}
                  </span>
                  {value && value.title === elem.title && <CheckIcon className={cls('h-6 w-6')} aria-hidden="true"></CheckIcon>}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
