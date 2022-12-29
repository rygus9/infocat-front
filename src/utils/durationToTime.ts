// 01:30 => { hour : 1, min : 30}

export default function durationToTime(duration: string) {
  let [hour, min] = duration.split(':').map((elem) => parseInt(elem));
  return { hour, min };
}
