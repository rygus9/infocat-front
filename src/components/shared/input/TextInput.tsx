import cls from '@/utils/cls';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';

interface TextInputProps {
  type: 'text' | 'password' | 'email';
  register: UseFormRegisterReturn;
  id?: string;
  placeholder?: string;
}

const TextInput = ({ register, ...rest }: TextInputProps) => {
  return (
    <input
      {...rest}
      {...register}
      autoComplete="off"
      className={cls(
        'w-full border border-lightGray bg-white px-2.5 py-2 shadow-sm',
        'text-base text-darkGray',
        'placeholder:text placeholder:text-lightGray',
        'focus:border-darkPurPle focus:ring-0'
      )}
    ></input>
  );
};

export default TextInput;
