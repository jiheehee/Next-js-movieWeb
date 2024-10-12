//동적 주소 처리 방식
// 1. query string방식 <-혹은 파람사용-> search params 주소?key=value&key2=value2
// 2. url params 

//우리는 쿼리스트링 방식으로 해볼꺼에용

import dayjs from "dayjs";
import { PrevButton } from "./PrevButton";
import Link from "next/link";

// locahost:3000/?targetDt=20241009

type Props = {
  searchParams: {
    targetDt?: string; //물음표는 있을수도 있고 없을수도 있는 데이터이다 라는 의미
  }
}

const today = dayjs().subtract(1, 'day').format('YYYYMMDD'); // 오늘 보다 1일 이전 날짜를 YYYYMMDD 형식으로 출력

export default async function Home({ searchParams: { targetDt = today } }:Props) {
  // 데이터 로드
  const key = '3801c7437930ca3e5a37fd86b59383ea';
  // const targetDt = '20241011';
  const baseUrl = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';
  const url = `${baseUrl}?key=${key}&targetDt=${targetDt}`;

  // 요청
  const response = await fetch(url);
  // json 파싱
  const json: ResponseType = await response.json();

  // console.log( JSON.stringify( json, null, 2 ) );

  const char = "a"; // string
  // const char = "a" "b"; // 문법적으로 안됨
  const chars = ["a", "b", "c"]; // string[] -> 문자열 배열

  // return 할 수 있는 유형
  // 1. Primitive 타입 데이터 (number, string, boolean)
  // 2. JSX Node
  // 3. 1 혹은 2로 구성된 배열
  // Array.map
  return [
    <div className="w-[500px] mx-auto">
      <div className="flex justify-between">
        {/* <a href={'?targetDt=' + dayjs(targetDt).subtract(1, 'day').format('YYYYMMDD')}>이전</a> */}
        {/* <Link></Link> */}
        {/* <button>이전</button> */}
        <PrevButton targetDt={targetDt}/>
        {dayjs(targetDt).format('YYYY년 MM월 DD일')}
        <button>다음</button>
      </div>
      <ol className="divide-y *:py-4 mt-4">
        {
          json.boxOfficeResult.dailyBoxOfficeList.map((item: ItemType) => (
            <li key={item.rank}>{item.rank}위 -{' '}
            <Link href={`/movie/${item.movieCd}`}>
              {item.movieNm}
              </Link>
              { item.rankOldAndNew === 'NEW' && <span className="ml-1 text-xs text-red-500">N</span> }
              {/*
                <If condition={ item.rankOldAndNew === 'NEW' }>
                  <Then>N</Then>
                </If>
              */}
            </li>
          ))
          // [
          //   <li>{json.boxOfficeResult.dailyBoxOfficeList[0].movieNm}</li>,
          //   <li>{json.boxOfficeResult.dailyBoxOfficeList[1].movieNm}</li>,
          //   <li>{json.boxOfficeResult.dailyBoxOfficeList[2].movieNm}</li>
          // ]
        }
      </ol>
      {/* <pre><code>{JSON.stringify(json, null, 2)}</code></pre> */}
    </div>
  ];
}

// 자바스크립트 값 할당할때 팁
// const key = condition || 'value'; -> condition이 거짓일때 value가 할당됨
// cosnt key = condition ? '1' : '2'; -> 삼항연산자를 이용

type ResponseType = {
  boxOfficeResult: {
    boxofficeType: string,
    showRange: string,
    dailyBoxOfficeList: ItemType[],
  }
}

type ItemType = {
  rnum: string;
  rank: string;
  rankInten: string;
  rankOldAndNew: string;
  movieCd: string;
  movieNm: string;
  openDt: string;
  salesAmt: string;
  salesShare: string;
  salesInten: string;
  salesChange: string;
  salesAcc: string;
  audiCnt: string;
  audiInten: string;
  audiChange: string;
  audiAcc: string;
  scrnCnt: string;
  showCnt: string;
}

// /movie/201231234 : moviceCd에 대한 정보를 표시












