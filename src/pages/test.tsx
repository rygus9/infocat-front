import cls from '@/utils/cls';
import { XCircleIcon } from '@heroicons/react/24/outline';
import * as React from 'react';
import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';

type FormValues = {
  question: { content: string }[];
};

export default function App() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      question: [{ content: '' }],
    },
    mode: 'onBlur',
  });
  const { fields, append, remove } = useFieldArray({
    name: 'question',
    control,
  });
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-auto mt-10 max-w-lg">
        <section className="space-y-2">
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <section className={'justify-center" flex items-stretch space-x-2'} key={field.id}>
                  <input
                    placeholder="value"
                    type="text"
                    {...register(`question.${index}.content` as const, {
                      required: true,
                    })}
                    className={cls(
                      'w-full border border-lightGray bg-white px-2.5 py-2 shadow-sm',
                      'text-base text-darkGray',
                      'placeholder:text placeholder:text-lightGray',
                      'focus:border-darkPurPle focus:ring-0'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className={cls('w-20 bg-lightPurple text-white', 'disabled:bg-darkWhite disabled:text-darkGray')}
                    disabled={fields.length === 1 ? true : false}
                  >
                    삭제
                  </button>
                </section>
              </div>
            );
          })}
        </section>

        <button
          type="button"
          onClick={() =>
            append({
              content: '',
            })
          }
          className="mt-2 mr-2 bg-lightPurple px-4 py-2 text-white"
        >
          질문 추가
        </button>
        <input type="submit" className="bg-lightPurple px-4 py-2 text-white" />
      </form>
    </div>
  );
}
