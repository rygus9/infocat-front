import cls from '@/utils/cls';
import { DetailedHTMLProps, ForwardedRef, forwardRef, TextareaHTMLAttributes } from 'react';

type TextAreaProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

const TextArea = forwardRef(({ rows = 2, ...props }: TextAreaProps, ref: ForwardedRef<any>) => {
  return (
    <textarea
      {...props}
      rows={rows}
      className={cls(
        'w-full border border-lightGray bg-white px-2 py-2 shadow-sm',
        'text-base text-darkGray',
        'placeholder:text placeholder:text-lightBlack',
        'focus:border-darkPurPle focus:ring-0'
      )}
      ref={ref}
    ></textarea>
  );
});

export default TextArea;
