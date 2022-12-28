import { MentoringApplyMenteeType } from '../../../components/Mentoring/Apply/ManteeInfoForm';
import { atom } from 'recoil';

const menteeFormAtom = atom<MentoringApplyMenteeType>({
  key: 'FormMentoringApplyMenteeAtom',
  default: {
    name: '',
    phoneNumber: '',
    status: {
      title: '',
      value: '',
    },
    major: '',
    introduce: '',
  },
});

export default menteeFormAtom;
