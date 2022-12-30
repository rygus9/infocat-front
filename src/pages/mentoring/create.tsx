import MentoringCreateForm from '@/components/Mentoring/Create/MentoringCreateForm';
import { NextPage } from 'next';

const create: NextPage = () => {
  return (
    <main className="m-auto max-w-xl px-4">
      <MentoringCreateForm></MentoringCreateForm>
    </main>
  );
};

export default create;
