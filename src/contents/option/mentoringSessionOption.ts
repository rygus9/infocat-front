export const statusToLabel = {
  Pending: '승인대기',
  Assign: '승인완료',
  MentorRefuse: '승인거부',
  ExpiredDate: '기한만료',
  Complete: '완료',
} as const;

export type StatusType = 'Pending' | 'Assign' | 'MentorRefuse' | 'ExpiredDate' | 'Complete';
