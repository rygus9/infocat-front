import client from '../common/client';
import axiosCase from '../common/promiseCase';

interface GetMenteeSessionRes {
  content: {
    classSessionId: string;
    title: string;
    name: string;
    status: string;
    applyDate: string;
    bookingDay: string;
    duration: string;
  }[];
}

const getMenteeSession = (): Promise<GetMenteeSessionRes> => axiosCase(client.get('/api/v1/my_page/user/class_session'));

export default getMenteeSession;
