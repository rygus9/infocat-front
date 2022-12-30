import { UseControllerProps, useController } from 'react-hook-form';
import CategoryInput from './CategoryInput';

export default function CategoryInputWithForm({ ...props }: UseControllerProps<any, any>) {
  const {
    field: { value, onChange, ref },
  } = useController(props);

  return <CategoryInput onChange={onChange} value={value}></CategoryInput>;
}
