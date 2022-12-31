import client from '../common/client';
import axiosCase from '../common/promiseCase';

interface GetInformerSessionRes {
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

const getInformerSession = (): Promise<GetInformerSessionRes> => axiosCase(client.get('/api/v1/my_page/mentor/class_session'));

export default getInformerSession;
