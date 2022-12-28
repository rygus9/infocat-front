import cls from '@/utils/cls';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';

interface TextAreaInputProps {
  id?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  rows?: number;
}

const TextAreaInput = ({ register, ...rest }: TextAreaInputProps) => {
  return (
    <textarea
      {...{ rows: 2, ...rest }}
      {...register}
      {...(rest.id ? {} : { id: register.name })}
      className={cls(
        'w-full border border-lightGray bg-white px-2 py-2 shadow-sm',
        'text-base text-darkGray',
        'placeholder:text placeholder:text-lightBlack',
        'focus:border-darkPurPle focus:ring-0'
      )}
    ></textarea>
  );
};

export default TextAreaInput;
