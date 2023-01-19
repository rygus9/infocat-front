import client from '../common/client';
import axiosCase from '../common/promiseCase';

interface MentoringApplyApiParams {
  introduce: string;
  major: string;
  mentoringId: string;
  name: string;
  phone: string;
  questions: string;
  schedule: string;
  userCondition: string;
  wanted: string;
}

interface MentoringApplyApiRes {
  result: boolean;
}

const mentoringApplyApi = (data: MentoringApplyApiParams): Promise<MentoringApplyApiRes> =>
  axiosCase(client.post('/api/v1/mentoring/session', data));

export default mentoringApplyApi;
