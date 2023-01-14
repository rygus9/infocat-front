import logoutApi from '@/api/auth/logoutApi';
import Button from '@/components/shared/common/Button';
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
  const onLogout = async () => {
    await logoutApi();
    setCurrentUser(null);
    //mocking용 추후 지워야 하는 부분
    localStorage.removeItem('email');
    //
    router.replace('/');
  };

  useEffect(() => {
    currentUser ? setIsLogind(true) : setIsLogind(false);
  }, [currentUser]);

  return (
    <header className="sticky top-0 z-40 h-[6.5rem] w-full bg-white shadow-md">
      <div className="m-auto flex h-16 max-w-6xl items-center justify-between px-3 xs:px-6">
        <figure className="h-10 w-36 cursor-pointer text-xl font-bold" onClick={onLogoClick}>
          <HeaderLogo />
        </figure>
        <div className="flex items-center justify-center space-x-2">
          {isLogined ? (
            <>
              <Button btnStyle="controlMain" onClick={onMyPageClick}>
                마이페이지
              </Button>{' '}
              <Button btnStyle="controlSub" onClick={onLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <Button btnStyle="controlMain" onClick={onLoginClick}>
              로그인
            </Button>
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
