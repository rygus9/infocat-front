export const jobCategoryOption = [
  {
    mainCategory: 'IT/개발자',
    mainValue: '100',
    options: [
      { subCategory: 'SW 엔지니어', subValue: '101' },
      { subCategory: 'QA 엔지니어', subValue: '102' },
      { subCategory: '프론트엔드 엔지니어', subValue: '103' },
      { subCategory: '서버 엔지니어', subValue: '104' },
      { subCategory: '데이터 사이언티스트', subValue: '105' },
    ],
  },
  {
    mainCategory: '미디어/디자인',
    mainValue: '200',
    options: [{ subCategory: 'UX/UI 디자이너', subValue: '201' }],
  },
];

export const fieldCategoryOption = [
  {
    value: '1',
    name: '국내 자기소개서/이력서',
  },
  {
    value: '2',
    name: '국외 자기소개서/이력서',
  },
  {
    value: '3',
    name: '포트폴리오',
  },
  {
    value: '4',
    name: '면접',
  },
];

export const sortingOption = ['recent', 'popular', 'starts', 'high_price', 'low_price'];

export const menteeStatusOption = [
  {
    title: '무직',
    value: '무직',
  },
  {
    title: '현직 주니어',
    value: '현직 주니어',
  },
  {
    title: '현직 미들',
    value: '현직 미들',
  },
  {
    title: '경력 휴직',
    value: '경력 휴직',
  },
  {
    title: '학생',
    value: '학생',
  },
  {
    title: '기타',
    value: '기타',
  },
];

export const yearsToName = (years: number) => (years <= 1 ? '신입' : years <= 3 ? '주니어' : years <= 7 ? '미들' : '시니어');
