import BasicForm from '@/components/signup-mentor/BasicForm';
import CareerForm from '@/components/signup-mentor/CareerForm';
import { useState } from 'react';

const Informer = () => {
  const [progressStatus, setProgressStatus] = useState<'first' | 'second'>('first');
  const onNext = () => setProgressStatus('second');
  const onPrev = () => setProgressStatus('first');

  return (
    <main className="m-auto w-full max-w-xl">
      {progressStatus === 'first' ? <BasicForm onNext={onNext}></BasicForm> : <CareerForm onPrev={onPrev}></CareerForm>}
    </main>
  );
};

export default Informer;
