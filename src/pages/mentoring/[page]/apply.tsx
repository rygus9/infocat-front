import ManteeInfoForm from '@/components/Mentoring/Apply/ManteeInfoForm';
import MentoringInfoForm from '@/components/Mentoring/Apply/MentoringInfoForm';
import { NextPage } from 'next';
import { useState } from 'react';

const ApplyPage: NextPage = () => {
  const [progressStatus, setProgressStatus] = useState<'first' | 'second'>('first');
  const onNext = () => setProgressStatus('second');
  const onPrev = () => setProgressStatus('first');

  return (
    <div className="m-auto max-w-xl px-4">
      {progressStatus === 'first' ? (
        <ManteeInfoForm onNext={onNext}></ManteeInfoForm>
      ) : (
        <MentoringInfoForm onPrev={onPrev}></MentoringInfoForm>
      )}
    </div>
  );
};

export default ApplyPage;
