import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { RxDoubleArrowDown } from "react-icons/rx";
import Spinner from "../Spinner/Spinner";

const infoType = [
  { title: "TYPE", content: ["NAVER", "KAKAO"] },
  { title: "DAY", content: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] },
];

const WebtoonBox = () => {
  const { webtoons, webtoonList, status } = useFetch();
  const [selectedId, setSelectedId] = useState<number[]>([-1, -1]);
  const [selectedName, setSeletedName] = useState<string[]>(["", ""]);
  const [loading, setLoading] = useState(false);
  const randomPage = Math.round(Math.random() * 50) + 1;

  const handleRoleClick = (content: string, typeIndex: number, contentIndex: number) => {
    // 선택된 버튼 id 배열
    const newArrId = [...selectedId];
    newArrId[typeIndex] = contentIndex;
    setSelectedId(newArrId);
    // 선택된 버튼 name 배열
    const newNames = [...selectedName];
    newNames[typeIndex] = content;
    setSeletedName(newNames);
  };

  const handleRoleBtn = (typeIndex: number, contentIndex: number) => {
    return selectedId[typeIndex] === contentIndex ? "bg-orange-400 text-white" : "bg-gray-400";
  };

  const handleRandomClick = async () => {
    setLoading(true);
    await webtoons(`perPage=2&page=${randomPage}&service=${selectedName[0].toLowerCase()}&updateDay=${selectedName[1].toLowerCase()}`);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 center w-1/2 h-4/5 rounded-lg shadow-2xl bg-black p-3 z-10 size:text-sm transition-all duration-500">
      <div className="relative h-[55%] flex gap-3 border border-white rounded-lg size:gap-1 transition-all duration-500">
        {loading ? (
          <Spinner />
        ) : webtoonList.length ? (
          webtoonList.map(({ webtoonId, img, title, url }) => (
            <div key={webtoonId} className="flexCenter text-center flex-col gap-3 px-3 py-2 text-white size:p-1 transition-all duration-500">
              <div className="w-full h-[85%] flex justify-center border-2 border-white rounded-lg px-2 py-3">
                <a href={url} target="_blank" rel="noreferrer">
                  <img src={img} className={`h-full rounded-lg hover:scale-105 transition-all object-contain`} alt={`웹툰 랜덤추천 ${title}`} />
                </a>
              </div>
              <p className="text-lg font-semibold size:text-xs transition-all duration-500">{title}</p>
            </div>
          ))
        ) : !webtoonList.length && status ? (
          <div className="relative flexCenter flex-col gap-2 text-center text-2xl text-white font-semibold size:text-sm size:px-2 transition-all duration-500">
            <>
              <p>해당 랜덤 페이지에 요청 하신 조건의 웹툰이 없습니다.</p>
              <p className="text-orange-400">다시 랜덤버튼을 눌러 주세요.</p>
            </>
            <RxDoubleArrowDown className="absolute w-10 h-10 bottom-8 animate-bounce size:w-8 size:h-8 transition-all duration-500" />
          </div>
        ) : (
          <div className="flexCenter text-2xl text-center text-white font-semibold size:text-sm size:px-2 transition-all duration-500">
            <p>
              🔎 원하는 조건을 선택하고 <b className="text-orange-400">랜덤으로 웹툰을</b> 찾아보세요.
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-8 py-6 border border-white rounded-lg">
        {infoType.map(({ title, content }, typeIndex) => (
          <div key={typeIndex} className="w-full flex items-center gap-6 px-6 text-white font-semibold size:gap-3 size:px-3">
            <div className="w-10 text-xl size:text-xs transition-all duration-500">
              <p>{title}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {content.map((el, contentIndex) => (
                <button
                  key={contentIndex}
                  type="button"
                  className={`px-3 py-2 rounded-lg font-medium hover:bg-orange-400 hover:text-white size:p-1 size:text-xs ${handleRoleBtn(typeIndex, contentIndex)}`}
                  onClick={() => handleRoleClick(el, typeIndex, contentIndex)}
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
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 text-xl font-medium mt-4 px-6 py-3 rounded-md text-white ${
          !(selectedName[0].length && selectedName[1].length) ? "bg-gray-400" : "bg-orange-400"
        } size:text-sm size:px-3 size:py-2 size:bottom-9 transition-all duration-500`}
        disabled={!(selectedName[0].length && selectedName[1].length)}
        onClick={handleRandomClick}
      >
        RANDOM PICK
      </button>
    </div>
  );
};

export default WebtoonBox;
