import { MentoringCardParams } from '@/api/mentoring/mentoringListSearchApi';
import usePathPush from '@/hooks/useReplace';
import cls from '@/utils/cls';
import yearToRank from '@/contents/translate/yearToRank';
import { range } from 'rambda';
import { PropsWithChildren } from 'react';

type MentoringCardProps = MentoringCardParams;

export default function MentoringCard({ id, title, role, years, company, stars, image }: MentoringCardProps) {
  const onMentoringPush = usePathPush('/mentoring/' + id);

  return (
    <article
      className={cls(
        'relative top-0 z-0 h-full w-full max-w-[22rem] cursor-pointer rounded-md bg-white p-6 shadow-md sm:p-6',
        'transition-all duration-200 hover:-top-1'
      )}
      onClick={onMentoringPush}
    >
      <header className="flex items-center space-x-4">
        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-lightGray"></div>
        <h3 className="text-lg leading-6">{title}</h3>
      </header>
      <section className="space-y-2 pl-3 pt-4 pb-0 text-base">
        <LabelContent title="직무">{role}</LabelContent>
        <LabelContent title="경력">{yearToRank(years)}</LabelContent>
        <LabelContent title="현직">{company}</LabelContent>
        <LabelContent title="평가">{stars} / 5.0</LabelContent>
      </section>
    </article>
  );
}

export function LoadingCard() {
  return (
    <article className="h-full w-full max-w-[22rem] rounded-md bg-white p-6 shadow-md sm:p-6">
      <header className="flex items-center space-x-4">
        <div className="h-10 w-10 flex-shrink-0 animate-pulse rounded-full bg-lightGray"></div>
        <div className="h-10 w-full animate-pulse rounded-lg bg-lightGray"></div>
      </header>
      <section className="space-y-2 pl-3 pt-4 pb-0 text-base">
        {range(1, 5).map((elem) => (
          <p className="h-6 w-[80%] animate-pulse rounded-lg bg-lightGray" key={elem}></p>
        ))}
      </section>
    </article>
  );
}

function LabelContent({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="flex justify-start space-x-4">
      <h5 className="text-[#d1cfcf]">{title}</h5>
      <p className="text-[#8d8d8d]">{children}</p>
    </div>
  );
}
