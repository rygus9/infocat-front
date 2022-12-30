import { atom } from 'recoil';
import localStorageEffect from '../effect/localStorageEffect';

export interface ICurrentUserAtom {
  isInformer: boolean;
  nickName: string;
}

const currentUserAtom = atom<ICurrentUserAtom | null>({
  key: 'CurrentUser',
  default: null,
  effects_UNSTABLE: [localStorageEffect('current_user')],
});

export default currentUserAtom;
