import getInformerSession from '@/api/mentoringSession/getInformerSession';
import { useQuery } from 'react-query';
export default function useInformerSession() {
  const queryRes = useQuery({
    queryKey: [`mentorSession`],
    queryFn: () => getInformerSession(),
    suspense: false,
  });

  return queryRes;
}
