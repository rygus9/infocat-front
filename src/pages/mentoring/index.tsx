import MainBanner from '@/components/mentoring/main/MainBanner';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const MainListNotSSR = dynamic(() => import('@/components/mentoring/main/MainList'), { ssr: false });

const Mentoring: NextPage = () => {
  return (
    <main className="bg-darkWhite">
      <MainBanner />
      <MainListNotSSR></MainListNotSSR>
    </main>
  );
};

export default Mentoring;
