import cls from '@/utils/cls';
import { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = forwardRef((props: InputProps, ref: ForwardedRef<any>) => {
  return (
    <input
      {...props}
      autoComplete="off"
      className={cls(
        'w-full border border-lightGray bg-white px-2.5 py-2 shadow-sm',
        'text-base text-darkGray',
        'placeholder:text placeholder:text-lightBlack',
        'focus:border-darkPurPle focus:ring-0',
        props.className ? props.className : ''
      )}
      ref={ref}
    ></input>
  );
});

export default Input;
