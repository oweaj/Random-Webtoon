import useFetch from "../../hooks/useFetch";
import { RxDoubleArrowDown } from "react-icons/rx";
import { useState } from "react";
import { Link } from "react-router-dom";

const infoType = [
  { title: "분 류", content: ["NAVER", "KAKAO"] },
  // { title: "요 일", content: ["일", "월", "화", "수", "목", "금", "토"] },
];

const WebtoonBox = () => {
  const { webtoons, status, webtoonList } = useFetch();
  const [number, setNumber] = useState<number | null>(null);
  const [typeName, setTypeName] = useState("");

  const handleRoleClick = (content: string, index: number) => {
    setTypeName(content);
    setNumber(number === index ? null : index);
  };

  const handleRoleBtn = (index: number) => {
    return number === index ? "bg-orange-400 text-white" : "bg-gray-300";
  };

  const randomPage = Math.round(Math.random() * 500) + 1;

  const handleRandomClick = () => {
    webtoons(`perPage=2&page=${randomPage}&service=${typeName.toLowerCase()}`);
  };

  console.log(webtoonList);

  return (
    <div className="flex flex-col gap-4 center w-1/2 h-4/5 rounded-lg shadow-2xl bg-gray-100 px-4 py-2 z-10">
      <div className="h-[55%] flex gap-3">
        {webtoonList.length ? (
          webtoonList.map(({ webtoonId, img, title, url }) => (
            <div key={webtoonId} className="w-full flex flex-col items-center justify-center gap-3 p-2 border border-gray-400">
              <div className="h-[85%]">
                <a href={url} target="_blank" rel="noreferrer">
                  <img src={img} className={`h-full rounded-lg hover:scale-105 transition-all`} alt={`웹툰 랜덤추천 ${title}`} />
                </a>
              </div>
              <p className="text-lg font-semibold">{title}</p>
            </div>
          ))
        ) : (
          <div className="relative w-full flex items-center justify-center text-2xl font-semibold border border-gray-400">
            <p>
              🔎 원하는 웹툰 조건을 선택하고 <b className="text-orange-400">랜덤으로 웹툰</b>을 찾아보세요.
            </p>
            <RxDoubleArrowDown className="absolute w-10 h-10 bottom-8 animate-bounce" />
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-8 py-6 border border-gray-400">
        {infoType.map(({ title, content }, index) => (
          <div key={index} className="w-4/5 flex items-center text-gray-700 font-semibold">
            <p className="flex-grow text-xl border-gray-400">{title}</p>
            <div className="flex-grow flex gap-4">
              {content.map((el, index) => (
                <button
                  key={index}
                  type="button"
                  className={`px-4 py-2 rounded-lg font-medium hover:bg-orange-400 hover:text-white ${handleRoleBtn(index)}`}
                  onClick={() => handleRoleClick(el, index)}
                >
                  {el}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-xl font-medium mt-4 px-6 py-3  ${!typeName ? "bg-gray-400" : "bg-orange-400 text-white"}`}
        disabled={!typeName}
        onClick={handleRandomClick}
      >
        RANDOM PICK
      </button>
    </div>
  );
};

export default WebtoonBox;
