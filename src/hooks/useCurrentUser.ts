import currentUserAtom, { ICurrentUserAtom } from '@/recoil/user/currentUserAtom';
import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function useCurrentUser() {
  const currentUserState = useRecoilValue(currentUserAtom);
  const [userState, setUserState] = useState<ICurrentUserAtom | null>();

  useLayoutEffect(() => {
    setUserState(currentUserState);
  }, []);

  return userState;
}
