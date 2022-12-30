import cls from '@/utils/cls';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ToggleInputProps {
  label: string;
  register: UseFormRegisterReturn;
  type?: 'checkbox' | 'radio';
  value?: string;
}

const ToggleInput = ({ label, register, type = 'checkbox', value }: ToggleInputProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex h-full items-center">
      <input
        type={type}
        id={label}
        {...register}
        className={cls('hidden')}
        value={value}
        tabIndex={0}
        onChange={(event) => {
          register.onChange(event);
          setChecked((checked) => !checked);
        }}
      ></input>
      <label
        htmlFor={label}
        className={cls(
          'cursor-pointer border bg-white py-1.5 px-3 text-base',
          checked ? 'border-darkPurPle text-darkPurPle' : 'border-lightGray text-darkGray'
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default ToggleInput;
