import cls from '@/utils/cls';
import { useFieldArray, UseFieldArrayProps, UseFormRegister } from 'react-hook-form';

interface QuestionsInputProps {
  register: UseFormRegister<any>;
  placeholder?: string;
  buttonText?: string;
}

export default function QuestionsInput({
  register,
  placeholder,
  buttonText,
  ...props
}: QuestionsInputProps & UseFieldArrayProps<any, any>) {
  const { fields, append, remove } = useFieldArray(props);
  const name = props.name;
  return (
    <fieldset>
      <section className="space-y-2">
        {fields.map((field, index) => {
          return (
            <div key={field.id} className={'justify-center" flex items-start space-x-2'}>
              <textarea
                placeholder={placeholder}
                {...register(`${name}.${index}.content` as const, {
                  required: true,
                })}
                className={cls(
                  'w-full border border-lightGray bg-white px-2.5 py-2 shadow-sm',
                  'text-base text-darkGray',
                  'placeholder:text placeholder:text-lightGray',
                  'focus:border-darkPurPle focus:ring-0'
                )}
                rows={3}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className={cls('w-20 bg-lightPurple py-2 text-white', 'disabled:bg-darkWhite disabled:text-darkGray')}
                disabled={fields.length === 1 ? true : false}
              >
                삭제
              </button>
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
        // className="mt-2 mr-2 bg-lightPurple px-4 py-2 text-white"
        className={cls(
          'mt-2 w-full border border-lightGray bg-white px-2.5 py-2 shadow-sm',
          'text-base text-darkGray',
          'focus:border-darkPurPle focus:outline-none focus:ring-0'
        )}
      >
        {buttonText ? buttonText : '질문 추가하기'}
      </button>
    </fieldset>
  );
}
