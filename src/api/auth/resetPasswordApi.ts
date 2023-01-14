import removeUndefined from '@/utils/removeUndefined';
import axiosClient from '../common/client';
import axiosCase from '../common/promiseCase';

interface ResetPasswordParams {
  refreshToken: string;
}

interface ResetPasswordReturn {
  result: boolean;
}

const resetPasswordApi = ({ ...elem }: ResetPasswordParams): Promise<ResetPasswordReturn> =>
  axiosCase(axiosClient.post('/api/v1/auth/reset_password', removeUndefined({ ...elem })));

export default resetPasswordApi;
