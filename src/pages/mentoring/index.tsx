import MainBanner from '@/components/Mentoring/Main/MainBanner';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const MainListNotSSR = dynamic(() => import('@/components/Mentoring/Main/MainList'), { ssr: false });

const Mentoring: NextPage = () => {
  return (
    <main className="bg-darkWhite">
      <MainBanner />
      {/* <MainList /> */}
      <MainListNotSSR></MainListNotSSR>
    </main>
  );
};

export default Mentoring;
