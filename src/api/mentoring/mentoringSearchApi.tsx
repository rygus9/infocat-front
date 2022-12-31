import client from '../common/client';
import axiosCase from '../common/promiseCase';

export interface MentoringSearchApiRes {
  classId: string;
  mentorId: string;
  nickname: string;
  title: string;
  shorts: string;
  content: string;
  role: string;
  job: string;
  career: string;
  years: string;
  company: string;
  stars: string;
  image: string;
  price: string;
  isSaved: boolean; // 로그인 없음 그냥 false, 있음 찜여부 판단하기
}

const mentoringSearchApi = (mentoringId: string): Promise<MentoringSearchApiRes> =>
  axiosCase(client.get(`/api/v1/mentoring/${mentoringId}`));

export default mentoringSearchApi;
