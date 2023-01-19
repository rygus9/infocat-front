import { MentoringApplyMentoringType } from '@/components/mentoring/apply/MentoringInfoForm';
import { atom } from 'recoil';

const mentoringFormAtom = atom<MentoringApplyMentoringType>({
  key: 'FormMentoringApplyMentoringAtom',
  default: {
    schedule: '',
    questions: [{ content: '' }],
    wanted: '',
  },
});

export default mentoringFormAtom;
