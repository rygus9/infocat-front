import DetailBanner from '@/components/Mentoring/Detail/DetailBanner';
import DetailBody from '@/components/Mentoring/Detail/DetailBody';
import Order from '@/components/Mentoring/Detail/Order';
import { StarIcon } from '@heroicons/react/24/outline';
import { NextPage } from 'next';

const MentoringPage: NextPage = () => {
  return (
    <main className="w-full">
      <DetailBanner></DetailBanner>
      <div className="relative m-auto flex h-full max-w-5xl items-stretch px-4">
        <DetailBody></DetailBody>
        <div className="relative hidden lg:block">
          <Order />
        </div>
      </div>
      <div className="sticky bottom-0 border-t border-palePurple bg-white py-2 lg:hidden">
        <nav className="flex h-fit justify-center space-x-2 px-3">
          <button className="h-12 w-full max-w-[370px] flex-1 rounded-xl bg-[#a272de] px-10 text-2xl text-white">신청하기</button>
          <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(0,0,0,0.1)] bg-white shadow-md">
            <StarIcon className="h-6 w-6"></StarIcon>
          </button>
        </nav>
      </div>
    </main>
  );
};

export default MentoringPage;
