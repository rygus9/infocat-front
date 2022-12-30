import { atom } from 'recoil';

const companyAtom = atom({
  key: 'InformerRegistCompanyAtom',
  default: {
    company: '',
  },
});

export default companyAtom;
