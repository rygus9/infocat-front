import client from '../common/client';
import axiosCase from '../common/promiseCase';

interface MentoringCreateApiParams {
  career: string;
  content: string;
  duration: string;
  field: number[];
  image: string;
  price: number;
  role: number;
  shorts: string;
  times: string[];
  title: string;
}

interface MentoringCreateApiRes {
  result: boolean;
}

const mentoringCreateApi = (data: MentoringCreateApiParams): Promise<MentoringCreateApiRes> =>
  axiosCase(client.post('/api/v1/mentoring', data));

export default mentoringCreateApi;
