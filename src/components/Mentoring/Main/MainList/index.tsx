import MainFiltering from './MainFiltering';
import MentoringCard from './MentoringCard';
import PageNav from './PageNav';

const cardList = [
  {
    id: 1,
    title: '[대기업 전용] 개발자 자소서 첨삭 및 커리어 상담',
    role: 'SW엔지니어',
    years: '1',
    company: '삼성전자',
    stars: 4.5,
    image: 's3',
  },
  {
    id: 2,
    title: '[대기업 전용] 개발자 자소서 첨삭 및 커리어 상담',
    role: 'SW엔지니어',
    years: '1',
    company: '삼성전자',
    stars: 4.5,
    image: 's3',
  },
  {
    id: 3,
    title: '[대기업 전용] 개발자 자소서 첨삭 및 커리어 상담',
    role: 'SW엔지니어',
    years: '1',
    company: '삼성전자',
    stars: 4.5,
    image: 's3',
  },
  {
    id: 4,
    title: '[대기업 전용] 개발자 자소서 첨삭 및 커리어 상담',
    role: 'SW엔지니어',
    years: '1',
    company: '삼성전자',
    stars: 4.5,
    image: 's3',
  },
  {
    id: 5,
    title: '[대기업 전용] 개발자 자소서 첨삭 및 커리어 상담',
    role: 'SW엔지니어',
    years: '1',
    company: '삼성전자',
    stars: 4.5,
    image: 's3',
  },
  {
    id: 6,
    title: '[대기업 전용] 개발자 자소서 첨삭 및 커리어 상담',
    role: 'SW엔지니어',
    years: '1',
    company: '삼성전자',
    stars: 4.5,
    image: 's3',
  },
];

export default function MainList() {
  return (
    <main className="m-auto max-w-5xl">
      <MainFiltering></MainFiltering>
      <section className="grid w-full grid-cols-3 justify-items-center py-0">
        {cardList.map((elem) => (
          <div key={elem.id} className="p-3">
            <MentoringCard {...elem} />
          </div>
        ))}
      </section>
      <nav className="pb-20 pt-5">
        <PageNav></PageNav>
      </nav>
    </main>
  );
}
