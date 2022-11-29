import { AxiosPromise } from 'axios';
import axiosClient from '../common/client';
import axiosCase from '../common/promiseCase';

interface ResetPasswordProps {
  refreshToken: string;
}

interface ResetPasswordReturn {
  result: boolean;
}

const resetPasswordApi = ({ ...elem }: ResetPasswordProps): Promise<ResetPasswordReturn> =>
  axiosCase(axiosClient.post('/auth/reset_password', { ...elem }));

export default resetPasswordApi;
