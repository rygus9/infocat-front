import { JoinInfoForm } from '@/components/signup/SignUpForm/FirstForm';
import { atom } from 'recoil';

const joinInfoAtom = atom<JoinInfoForm>({
  key: 'joinInfoAtom',
  default: {
    email: '',
    nickName: '',
    aboutPassword: {
      password: '',
      passwordValid: '',
    },
  },
});

export default joinInfoAtom;
