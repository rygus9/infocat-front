import client from '../common/client';
import axiosCase from '../common/promiseCase';

interface MentorRegistApiParams {
  years: string;
  email: string;
  career: string;
  job: string;
  phoneNumber: string;
  name: string;
}

interface MentorRegistApiRes {
  result: boolean;
}

const mentorRegistApi = (data: MentorRegistApiParams): Promise<MentorRegistApiRes> => axiosCase(client.post('/api/v1/mentor', data));

export default mentorRegistApi;
