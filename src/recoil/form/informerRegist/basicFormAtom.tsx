import { BasicFormType } from '@/components/signup-informer/BasicForm';
import { atom } from 'recoil';

const basicFormAtom = atom<BasicFormType>({
  key: 'InformerRegistBasicForm',
  default: {
    name: '',
    phone: '',
    companyEmail: '',
    emailCode: '',
  },
});

export default basicFormAtom;
