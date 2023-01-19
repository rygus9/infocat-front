import cls from '@/utils/cls';
import { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes, useState } from 'react';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type ToggleProps = InputProps & {
  label: string;
};

const Toggle = forwardRef(({ type = 'checkbox', label, onChange, ...props }: ToggleProps, ref: ForwardedRef<any>) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex h-full items-center">
      <input
        type={type}
        id={label}
        {...props}
        className={cls('hidden')}
        tabIndex={0}
        onChange={(event) => {
          typeof onChange === 'function' && onChange(event);
          setChecked((checked) => !checked);
        }}
        ref={ref}
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
});

export default Toggle;
