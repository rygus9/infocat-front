import mentoringScheduleSearch from '@/api/mentoring/mentoringScheduleSearch';
import { useQuery } from 'react-query';
export default function useMentoringSchedule(mentoringId: string) {
  const queryRes = useQuery({
    queryKey: [`mentoringSearchSchedule_${mentoringId}`],
    queryFn: () => mentoringScheduleSearch(mentoringId),
    suspense: false,
  });

  return queryRes;
}
