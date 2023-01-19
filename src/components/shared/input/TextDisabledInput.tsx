import cls from '@/utils/cls';

interface TextDisabledInputProps {
  value: string;
}

export default function TextDisabledInput({ value }: TextDisabledInputProps) {
  return (
    <input
      value={value}
      disabled={true}
      autoComplete="off"
      className={cls(
        'w-full border border-lightGray bg-darkWhite px-2.5 py-2 shadow-sm',
        'text-base text-gray',
        'placeholder:text placeholder:text-lightBlack',
        'focus:border-darkPurPle focus:ring-0'
      )}
    ></input>
  );
}
