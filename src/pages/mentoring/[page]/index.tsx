import mentoringSearchApi, { MentoringSearchApiRes } from '@/api/mentoring/mentoringSearchApi';
import ApplyButton from '@/components/Mentoring/Detail/ApplyButton';
import DetailBanner from '@/components/Mentoring/Detail/DetailBanner';
import DetailBody from '@/components/Mentoring/Detail/DetailBody';
import Order from '@/components/Mentoring/Detail/Order';
import { StarIcon } from '@heroicons/react/24/outline';
import { GetServerSideProps, NextPage } from 'next';

const MentoringPage: NextPage<{ data: MentoringSearchApiRes }> = ({ data }) => {
  console.log(data);
  data.career = data.career || '등록된 경력이 없습니다.';
  return (
    <main className="w-full">
      <DetailBanner title={data.title} introduce={data.shorts} role={data.role}></DetailBanner>
      <div className="relative m-auto flex h-full max-w-5xl items-stretch px-4">
        <DetailBody content={data.content} career={data.career} job={data.job} nickname={data.nickname} years={data.years}></DetailBody>
        <div className="relative hidden lg:block">
          <Order
            career={data.career}
            introduce={data.shorts}
            job={data.job}
            nickname={data.nickname}
            title={data.title}
            year={data.years}
          />
        </div>
      </div>
      {/* 모바일 버전 Order 대체용도 */}
      <div className="sticky bottom-0 border-t border-palePurple bg-white py-2 lg:hidden">
        <nav className="flex h-fit justify-center space-x-2 px-3">
          <ApplyButton designType="mobile"></ApplyButton>
          <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(0,0,0,0.1)] bg-white shadow-md">
            <StarIcon className="h-6 w-6"></StarIcon>
          </button>
        </nav>
      </div>
    </main>
  );
};

export default MentoringPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const { page } = context.query;
  let data = undefined;
  try {
    data = await mentoringSearchApi(page as string);
  } catch (err) {
    console.log(err);
  }
  return { props: { data } };

  // Pass data to the page via props
};
