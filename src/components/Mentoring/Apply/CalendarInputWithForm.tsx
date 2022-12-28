import Editor from '@/components/shared/editor/Editor';
import { UseControllerProps, useController } from 'react-hook-form';
import CalendarInput from './CalenderInput';

export default function CalendarInputWithForm({ ...props }: UseControllerProps<any, any>) {
  const {
    field: { value, onChange, ref },
  } = useController(props);

  const nowTime = value ? new Date(value) : null;

  return <CalendarInput selectTime={nowTime} setSelectTime={(time) => onChange(time.toISOString())}></CalendarInput>;
}
