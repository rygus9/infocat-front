import BasicForm from '@/components/signup-informer/BasicForm';
import CareerForm from '@/components/signup-informer/CareerForm';
import { useState } from 'react';

const Informer = () => {
  const [progressStatus, setProgressStatus] = useState<'first' | 'second'>('first');
  const onNext = () => setProgressStatus('second');
  const onPrev = () => setProgressStatus('first');

  return (
    <main className="m-auto w-full max-w-xl px-2 xs:px-4">
      {progressStatus === 'first' ? <BasicForm onNext={onNext}></BasicForm> : <CareerForm onPrev={onPrev}></CareerForm>}
    </main>
  );
};

export default Informer;
