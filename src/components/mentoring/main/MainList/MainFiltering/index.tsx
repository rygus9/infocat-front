import { useRouter } from 'next/router';
import SearchComponent from '../../common/SearchComponent';
import useMentoringListQuery from '../../hooks/useMentoringListQuery';
import CategoryFiltering from './CategoryFiltering';
import OrderMenu from './OrderMenu';

export default function MainFiltering() {
  const { data: mentoringListQuery } = useMentoringListQuery(false);
  const router = useRouter();

  return (
    <section className="w-full px-4 xs:px-6">
      <header className="flex w-full items-center justify-center pt-12 pb-6">
        <SearchComponent></SearchComponent>
      </header>
      <div className="w-full pb-5">
        <CategoryFiltering />
      </div>
      <div className="flex w-full items-center justify-between">
        <span className="text-sm text-darkGray">
          총 {mentoringListQuery?.totalElements ? mentoringListQuery?.totalElements : '..'}개의 멘토링
        </span>
        <OrderMenu />
      </div>
    </section>
  );
}
