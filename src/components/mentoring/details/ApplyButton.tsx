import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DenyModal from './DenyModal';

const buttonDesign = {
  desktop: 'h-16 rounded-xl bg-[#a272de] px-10 text-xl text-white',
  mobile: 'h-12 w-full max-w-[370px] flex-1 rounded-xl bg-[#a272de] px-10 text-2xl text-white',
};

export default function ApplyButton({ designType }: { designType: 'mobile' | 'desktop' }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const currentUser = useCurrentUser();
  const onClick = () => {
    if (!currentUser) {
      setOpen(true);
    } else {
      router.push(location.pathname + '/apply');
    }
  };

  return (
    <>
      <button className={buttonDesign[designType]} onClick={onClick}>
        신청하기
      </button>
      <DenyModal isOpen={open} closeModal={() => setOpen(false)}></DenyModal>
    </>
  );
}
