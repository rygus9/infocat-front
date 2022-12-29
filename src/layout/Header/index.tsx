import currentUserAtom from '@/recoil/user/currentUserAtom';
import cls from '@/utils/cls';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import HeaderLogo from './HeaderLogo';

const MenuList = [
  {
    memu: '멘토링',
    link: '/mentoring',
  },
  {
    memu: '블로그',
    link: '/blog',
  },
  {
    memu: '커뮤니티',
    link: '/community',
  },
];

export default function Header() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const [isLogined, setIsLogind] = useState(false);
  const onLogoClick = () => router.push('/');
  const onLoginClick = () => router.push('/login');
  const onMyPageClick = () => router.push('/mypage');
  const onLogout = () => {
    setCurrentUser(null);
    router.replace('/');
  };

  useEffect(() => {
    currentUser ? setIsLogind(true) : setIsLogind(false);
  }, [currentUser]);

  return (
    <header className="sticky top-0 z-40 h-[6.5rem] w-full bg-white shadow-md">
      <div className="m-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <figure className="h-10 w-36 cursor-pointer text-xl font-bold" onClick={onLogoClick}>
          <HeaderLogo />
        </figure>
        <div className="flex items-center justify-center space-x-2">
          {isLogined ? (
            <>
              <Button onClick={onMyPageClick}>마이페이지</Button> <Button onClick={onLogout}>로그아웃</Button>
            </>
          ) : (
            <Button onClick={onLoginClick}>로그인</Button>
          )}
        </div>
      </div>
      <nav className="flex h-10 items-center justify-center bg-lightPurple">
        {MenuList.map((menu) => (
          <Link href={menu.link} key={menu.memu}>
            <a
              className={cls(
                'flex h-full items-center justify-center border-2 border-lightPurple px-5 tracking-wide text-white',
                'hover:border-b-white'
              )}
            >
              {menu.memu}
            </a>
          </Link>
        ))}
      </nav>
    </header>
  );
}

function Button({ onClick, children }: PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <button className="rounded-lg bg-darkWhite py-1 px-3 text-sm text-gray" onClick={onClick}>
      {children}
    </button>
  );
}
