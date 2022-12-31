import PopTransition from '@/components/shared/common/PopTransition';
import { fieldCategoryOption, GeneralOption, jobCategoryOption, JobCategoryOptionMain, JobCategoryOptionSub } from '@/contents';
import cls from '@/utils/cls';
import removeUndefined from '@/utils/removeUndefined';
import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CategoryFiltering() {
  const router = useRouter();
  const query = router.query;
  const [main, setMain] = useState('');
  const [sub, setSub] = useState<JobCategoryOptionSub[]>([]);
  const [fields, setFields] = useState<GeneralOption[]>([]);

  const onMainClick = (mainCategory: JobCategoryOptionMain) => {
    setMain(mainCategory.mainCategory);
    setSub([]);
  };

  const onSubClick = (subCategory: JobCategoryOptionSub) => {
    setSub((arr) =>
      arr.map((sub) => sub.subCategory).includes(subCategory.subCategory)
        ? arr.filter((sub) => sub.subCategory !== subCategory.subCategory)
        : arr.concat(subCategory)
    );
  };

  const onFieldClick = (nowField: GeneralOption) => {
    setFields((arr) =>
      arr.map((listField) => listField.title).includes(nowField.title)
        ? arr.filter((listField) => listField.title !== nowField.title)
        : arr.concat(nowField)
    );
  };

  const onSubmit = () => {
    const queryFields = fields.map((elem) => elem.value).join(',');
    const queryCategory =
      main === ''
        ? ''
        : sub.length === 0
        ? jobCategoryOption
            .filter((elem) => elem.mainCategory === main)[0]
            .options.map((elem) => elem.subValue)
            .join(',')
        : sub.map((elem) => elem.subValue).join(',');
    console.log(queryFields, queryCategory);

    router.replace({
      query: removeUndefined({
        ...router.query,
        field: queryFields,
        category: queryCategory,
        page: undefined,
      }),
    });
  };

  return (
    <Popover className="relative text-gray">
      {({ open }) => (
        <>
          <Popover.Button className="text-gray-500 flex items-center justify-center rounded-md border border-lightGray bg-white px-4 py-2 focus:border-gray focus:shadow-custom  focus:outline-none">
            <span className="text-sm text-gray">카테고리 선택</span>
            <ChevronDownIcon className={cls('ml-2 h-5 w-5 text-gray transition-transform', open ? 'rotate-180' : '')} aria-hidden="true" />
          </Popover.Button>
          <PopTransition>
            <Popover.Panel className="absolute left-0 z-10 mt-2 lg:max-w-3xl">
              <div className="min-h-[10rem] w-80 rounded-md bg-white shadow-custom xs:w-96">
                <section className="p-3">
                  <h4 className="text-lg text-darkGray">멘토링 카테고리</h4>
                  <section className="flex h-fit items-stretch space-x-4">
                    <div className="h-fit w-full space-y-1 rounded-md py-2 pl-3 pr-6">
                      {jobCategoryOption.map((mainCategory) => (
                        <div
                          key={mainCategory.mainCategory}
                          className={cls(mainCategory.mainCategory === main ? 'text-lightPurple' : 'text-darkGray', 'w-fit cursor-pointer')}
                          onClick={() => onMainClick(mainCategory)}
                        >
                          {mainCategory.mainCategory} (전체)
                        </div>
                      ))}
                    </div>
                    <div className="h-36 w-full space-y-1 overflow-scroll rounded-md bg-darkWhite p-2">
                      {main &&
                        jobCategoryOption
                          .filter((elem) => elem.mainCategory === main)[0]
                          .options.map((subOption) => (
                            <div
                              key={subOption.subCategory}
                              className={cls(
                                'w-fit cursor-pointer',
                                sub.map((elem) => elem.subCategory).includes(subOption.subCategory) ? 'text-lightPurple' : 'text-darkGray'
                              )}
                              onClick={() => onSubClick(subOption)}
                            >
                              {subOption.subCategory}
                            </div>
                          ))}
                    </div>
                  </section>
                </section>
                <section className="p-3">
                  <h4 className="text-lg text-darkGray">멘토링 분야</h4>
                  <div>
                    {fieldCategoryOption.map((field) => (
                      <button
                        className={cls(
                          'mt-2 mr-2 w-fit border bg-white px-2 py-1 shadow-sm',
                          'text-sm text-darkGray',
                          'focus:outline-none focus:ring-0',
                          fields.map((elem) => elem.title).includes(field.title) ? 'border-darkPurPle' : 'border-lightGray'
                        )}
                        key={field.title}
                        onClick={() => onFieldClick(field)}
                        type="button"
                      >
                        {field.title}
                      </button>
                    ))}
                  </div>
                </section>
                <section className="p-3">
                  <Popover.Button className="rounded-full bg-lightPurple px-3 py-1 text-base text-darkWhite" onClick={onSubmit}>
                    적용하기
                  </Popover.Button>
                </section>
              </div>
            </Popover.Panel>
          </PopTransition>
        </>
      )}
    </Popover>
  );
}
