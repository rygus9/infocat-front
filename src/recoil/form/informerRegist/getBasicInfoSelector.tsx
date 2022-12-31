import { selector } from 'recoil';
import basicFormAtom from './basicFormAtom';
import companyAtom from './companyAtom';

const getBasicInfoSelector = selector({
  key: 'InformerRegist',
  get: ({ get }) => {
    const company = get(companyAtom);
    const basicForm = get(basicFormAtom);

    return {
      ...company,
      email: basicForm.companyEmail,
      phoneNumber: basicForm.phone,
      name: basicForm.name,
    };
  },
});

export default getBasicInfoSelector;
