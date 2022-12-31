import client from '../common/client';
import axiosCase from '../common/promiseCase';

interface mentroingScheduleSearchRes {
  classId: string;
  mentorId: string;
  duration: string;
  bookingDays: string[];
  totalDays: string[];
}

const mentoringScheduleSearch = (mentoringId: string): Promise<mentroingScheduleSearchRes> =>
  axiosCase(client.get(`/api/v1/mentoring/${mentoringId}/apply`));

export default mentoringScheduleSearch;
