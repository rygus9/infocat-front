import MenteeInfoForm from '@/components/mentoring/apply/MenteeInfoForm';
import MentoringInfoForm from '@/components/mentoring/apply/MentoringInfoForm';
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
