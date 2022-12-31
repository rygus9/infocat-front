import { StarIcon } from '@heroicons/react/24/outline';
import ApplyButton from './ApplyButton';

interface OrderProps {
  title: string;
  introduce: string;
  nickname: string;
  year: string;
  job: string;
  career: string;
}

export default function Order({ title, introduce, nickname, year, job, career }: OrderProps) {
  return (
    <div className="sticky top-20 z-10 w-fit pt-16 sm:sticky">
      <section className="w-80 rounded-xl border border-[rgba(0,0,0,0.1)] bg-white px-6 py-8 text-[#707070] shadow-xl">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="space-y-1 py-2 text-sm">
          <p>{introduce}</p>
        </div>
        <div className="flex items-stretch py-4">
          <div className="h-14 w-14 rounded-full bg-[#989898]"></div>
          <div className="flex flex-col items-start justify-center pl-3">
            <p>{nickname}</p>
            <p className="text-sm">
              {year}년차 / {job}
            </p>
          </div>
        </div>
        <div className="rounded-md bg-[#f2f2f2] p-4 text-sm">
          {career
            .split('|')
            .filter((elem) => elem)
            .map((elem, index) => (
              <p key={`${elem} ${index}`}>
                {index === 0 ? '현)' : '전)'} {elem}
              </p>
            ))}
        </div>
      </section>
      <nav className="mt-4 flex h-fit items-stretch justify-start space-x-4">
        <ApplyButton designType="desktop"></ApplyButton>
        <button className="flex h-16 w-16 items-center justify-center rounded-xl border border-[rgba(0,0,0,0.1)] bg-white shadow-md">
          <StarIcon className="h-6 w-6"></StarIcon>
        </button>
      </nav>
    </div>
  );
}
