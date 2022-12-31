import getMenteeSession from '@/api/mentoringSession/getMenteeSession';
import { useQuery } from 'react-query';
export default function useMenteeSession() {
  const queryRes = useQuery({
    queryKey: [`menteeSession`],
    queryFn: () => getMenteeSession(),
    suspense: false,
  });

  return queryRes;
}
