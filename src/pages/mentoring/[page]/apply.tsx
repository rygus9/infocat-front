import MenteeInfoForm from '@/components/Mentoring/Apply/MenteeInfoForm';
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
        <MenteeInfoForm onNext={onNext}></MenteeInfoForm>
      ) : (
        <MentoringInfoForm onPrev={onPrev}></MentoringInfoForm>
      )}
    </div>
  );
};

export default ApplyPage;
