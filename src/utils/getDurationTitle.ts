import { timeScaleOption } from '@/contents';

export default function getDurationTitle(value: string) {
  return timeScaleOption.filter((elem) => elem.value === value)[0].title;
}
