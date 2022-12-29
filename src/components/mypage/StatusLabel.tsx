import cls from '@/utils/cls';

interface StatusLabelProps {
  label: '완료' | '승인완료' | '승인대기' | '승인거부' | '기한만료';
}

const labelStyle = {
  완료: 'text-white bg-darkPurPle',
  승인완료: 'text-white bg-lightPurple',
  승인대기: 'text-darkGray bg-[#e8d6ff]',
  승인거부: 'text-darkGray bg-darkWhite',
  기한만료: 'text-darkGray bg-darkWhite',
};

export default function StatusLabel({ label }: StatusLabelProps) {
  return <label className={cls('inline-block h-fit w-[4.5rem]  rounded-full py-1 text-center text-sm', labelStyle[label])}>{label}</label>;
}
