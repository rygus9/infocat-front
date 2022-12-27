import Editor from '@/components/shared/editor/Editor';
import { UseControllerProps, useController } from 'react-hook-form';

export default function EditorWithForm({ ...props }: UseControllerProps<any, any>) {
  const {
    field: { value, onChange, ref },
  } = useController(props);

  return <Editor onChange={onChange} value={value} defaultValue=""></Editor>;
}
