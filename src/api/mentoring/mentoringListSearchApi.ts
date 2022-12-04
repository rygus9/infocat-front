import removeUndefined from '@/utils/removeUndefined';
import client from '../common/client';
import axiosCase from '../common/promiseCase';

interface MentoringListSearchApiParams {
  sorted?: string | string[];
  page?: string | string[];
  field?: string | string[];
  category?: string | string[];
  title?: string | string[];
}

export interface MentoringCardParams {
  id: number;
  company: string;
  role: string;
  stars: number;
  image: string;
  title: string;
  years: number;
}

interface MentoringListSearchRes {
  content: MentoringCardParams[];
  empty: boolean;
  first: true;
  last: false;
  totalPages: string;
  totalElements: string;
  [data: string]: any;
}

const mentoringListSearchApi = (searchParams: MentoringListSearchApiParams): Promise<MentoringListSearchRes> =>
  axiosCase(
    client.get('/api/v1/mentoring/posts', {
      params: removeUndefined(searchParams),
    })
  );

export default mentoringListSearchApi;
