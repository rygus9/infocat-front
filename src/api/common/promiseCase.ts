import { ErrorType } from '@/contents/errorMessage';
import { AxiosError, AxiosPromise } from 'axios';

export default function axiosCase<Type>(axiosPromise: AxiosPromise<any>): Promise<Type> {
  return axiosPromise
    .then((res) => res.data)
    .catch((err: AxiosError<ErrorType>) => {
      if (err.response) {
        console.log(err.response.data);
        throw err.response.data.errorCode;
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log('Setting Request Error', err.message);
      }
    });
}
