import localForage from 'localforage';
import { AtomEffect } from 'recoil';

const localForageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet }) => {
    if (typeof window !== 'undefined') {
      setSelf(
        localForage.getItem(key).then(
          (savedValue) => (savedValue != null ? (savedValue as any) : null) // Abort initialization if no value was stored
        )
      );

      // Subscribe to state changes and persist them to localForage
      onSet((newValue, _, isReset) => {
        isReset ? localForage.removeItem(key) : localForage.setItem(key, newValue);
      });
    }
  };

export default localForageEffect;
