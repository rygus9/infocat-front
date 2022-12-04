import DetailBanner from '@/components/Mentoring/Detail/DetailBanner';
import DetailBody from '@/components/Mentoring/Detail/DetailBody';
import Order from '@/components/Mentoring/Detail/Order';
import { NextPage } from 'next';

const MentoringPage: NextPage = () => {
  return (
    <main className="w-full">
      <DetailBanner></DetailBanner>
      <DetailBody></DetailBody>
      <Order />
    </main>
  );
};

export default MentoringPage;
