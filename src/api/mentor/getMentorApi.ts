import client from '../common/client';
import axiosCase from '../common/promiseCase';

interface GetMentorApiRes {
  career: string;
  company: string;
  email: string;
  job: string;
  name: string;
  phoneNumber: string;
  years: string;
}

const getMentorApi = (): Promise<GetMentorApiRes> => axiosCase(client.get('/api/v1/mentor'));

export default getMentorApi;
