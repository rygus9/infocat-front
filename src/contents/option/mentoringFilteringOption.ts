export const jobCategoryOption = [
  {
    mainCategory: 'IT/개발자',
    options: [
      // { subCategory: '전체', subValue: '100' },
      { subCategory: 'SW 엔지니어', subValue: '101' },
      { subCategory: 'QA 엔지니어', subValue: '102' },
      { subCategory: '프론트엔드 엔지니어', subValue: '103' },
      { subCategory: '서버 엔지니어', subValue: '104' },
      { subCategory: '데이터 사이언티스트', subValue: '105' },
    ],
  },
  {
    mainCategory: '미디어/디자인',
    options: [
      // { subCategory: '전체', subValue: '200' },
      { subCategory: 'UX/UI 디자이너', subValue: '201' },
    ],
  },
];

export interface JobCategoryOptionMain {
  mainCategory: string;
  options: JobCategoryOptionSub[];
}

export interface JobCategoryOptionSub {
  subCategory: string;
  subValue: string;
}

export interface GeneralOption {
  value: string;
  title: string;
}

export const fieldCategoryOption = [
  {
    value: '1',
    title: '국내 자기소개서/이력서',
  },
  {
    value: '3',
    title: '포트폴리오',
  },
  {
    value: '4',
    title: '면접',
  },
  {
    value: '2',
    title: '국외 자기소개서/이력서',
  },
];

export const sortingOption = ['recent', 'popular', 'starts', 'high_price', 'low_price'];
