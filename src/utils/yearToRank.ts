export default function yearToRank(years: number) {
  if (years <= 1) return '신입';
  if (1 < years && years <= 3) return '주니어';
  if (4 < years && years <= 7) return '미들';
  else return '시니어';
}
