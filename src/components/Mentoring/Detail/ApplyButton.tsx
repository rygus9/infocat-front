import { useRouter } from 'next/router';

const buttonDesign = {
  desktop: 'h-16 rounded-xl bg-[#a272de] px-10 text-xl text-white',
  mobile: 'h-12 w-full max-w-[370px] flex-1 rounded-xl bg-[#a272de] px-10 text-2xl text-white',
};

export default function ApplyButton({ designType }: { designType: 'mobile' | 'desktop' }) {
  const router = useRouter();
  const onClick = () => {
    router.push('/mentoring/apply');
  };

  return (
    <button className={buttonDesign[designType]} onClick={onClick}>
      신청하기
    </button>
  );
}
