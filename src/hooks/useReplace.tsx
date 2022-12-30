import { useRouter } from 'next/router';

export default function usePathPush(path: string) {
  const router = useRouter();
  const onPush = () => {
    router.push(path);
  };
  return onPush;
}
