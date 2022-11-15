import { PropsWithChildren } from 'react';

interface MentoringCard {
  title: string;
  role: string;
  years: string;
  company: string;
  stars: number;
  image?: string;
}

export default function MentoringCard({ title, role, years, company, stars, image }: MentoringCard) {
  return (
    <article className="h-72 w-80 rounded-md bg-white py-8 px-[2.25rem] shadow-md">
      <header className="flex items-center space-x-4">
        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
        <h3 className="text-lg leading-6">{title}</h3>
      </header>
      <section className="space-y-2 py-10 px-6 text-base">
        <LabelContent title="직무">{role}</LabelContent>
        <LabelContent title="경력">{years}</LabelContent>
        <LabelContent title="현직">{company}</LabelContent>
        <LabelContent title="평가">{stars} / 5.0</LabelContent>
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
