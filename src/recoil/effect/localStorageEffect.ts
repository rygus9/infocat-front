import { AtomEffect } from 'recoil';
import LocalStorage from './localStorage';

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet }) => {
    if (typeof window !== 'undefined') {
      const data = LocalStorage.getItem(key);
      setSelf(data ? JSON.parse(data) : null);

      // Subscribe to state changes and persist them to localForage
      onSet((newValue, _, isReset) => {
        isReset ? LocalStorage.removeItem(key) : LocalStorage.setItem(key, JSON.stringify(newValue));
      });
    }
  };

export default localStorageEffect;
