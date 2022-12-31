import { Suspense } from 'react';
import MainFiltering from './MainFiltering';
import MentoringListSection, { LoadingMentoringListSection } from './MentoringListSection';
export default function MainList() {
  return (
    <section className="m-auto w-full max-w-6xl">
      <MainFiltering></MainFiltering>
      <Suspense
        fallback={
          <>
            <LoadingMentoringListSection />
          </>
        }
      >
        <MentoringListSection></MentoringListSection>
      </Suspense>
    </section>
  );
}
