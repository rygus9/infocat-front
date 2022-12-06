import mentoringListSearchApi from '@/api/mentoring/mentoringListSearchApi';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

function useMentoringListQuery(suspense = true) {
  const router = useRouter();
  const { page, category, sorted, field, title } = router.query;
  console.log(page, category);

  const { data } = useQuery({
    queryKey: [`mentoringList_${JSON.stringify(router.query)}`],
    queryFn: () =>
      mentoringListSearchApi({
        category,
        page,
        sorted: sorted || 'recent',
        field,
        title,
      }),
    suspense,
  }); /** 이제는 이렇게 해줘야 하는구나. */

  return { data };
}

export default useMentoringListQuery;
