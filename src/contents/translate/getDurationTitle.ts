import { timeScaleOption } from '@/contents/option/scheduleOption';

export default function getDurationTitle(value: string) {
  return timeScaleOption.filter((elem) => elem.value === value)[0].title;
}
