import getMentorApi from '@/api/mentor/getMentorApi';
import { useQuery } from 'react-query';

export default function useMentorInfo() {
  const queryRes = useQuery({
    queryKey: [`mentorInfo`],
    queryFn: () => getMentorApi(),
    suspense: false,
  });

  return queryRes;
}
