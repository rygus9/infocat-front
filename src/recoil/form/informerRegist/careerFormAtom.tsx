import { CareerFormType } from '@/components/signup-informer/CareerForm';
import { atom } from 'recoil';

const careerFormAtom = atom<CareerFormType>({
  key: 'InformRegistCareerFrom',
  default: {
    years: '',
    role: '',
    careers: [
      {
        content: '',
      },
    ],
  },
});

export default careerFormAtom;
