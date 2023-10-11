import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { RxDoubleArrowDown } from "react-icons/rx";
import Spinner from "../Spinner/Spinner";

const infoType = [
  { title: "분 류", content: ["NAVER", "KAKAO"] },
  { title: "요 일", content: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] },
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
    return selectedId[typeIndex] === contentIndex ? "bg-orange-400 text-white" : "bg-gray-300";
  };

  const handleRandomClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      webtoons(`perPage=2&page=${randomPage}&service=${selectedName[0].toLowerCase()}&updateDay=${selectedName[1].toLowerCase()}`);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-4 center w-1/2 h-4/5 rounded-lg shadow-2xl bg-gray-200 px-4 py-2 z-10">
      <div className="relative h-[55%] flex gap-3 border border-gray-400">
        {loading ? (
          <Spinner />
        ) : webtoonList.length ? (
          webtoonList.map(({ webtoonId, img, title, url }) => (
            <div key={webtoonId} className="flexCenter text-center flex-col gap-3 p-2">
              <div className="w-full h-[85%] flex justify-center border-2 border-gray-400 rounded-lg px-2 py-3">
                <a href={url} target="_blank" rel="noreferrer">
                  <img src={img} className={`h-full rounded-lg hover:scale-105 transition-all`} alt={`웹툰 랜덤추천 ${title}`} />
                </a>
              </div>
              <p className="text-lg font-semibold">{title}</p>
            </div>
          ))
        ) : !webtoonList.length && status ? (
          <div className="relative flexCenter flex-col gap-2 text-2xl font-semibold">
            <>
              <p>해당 랜덤 페이지에 요청 하신 조건의 웹툰이 없습니다.</p>
              <p className="text-orange-400">다시 랜덤버튼을 눌러 주세요.</p>
            </>
            <RxDoubleArrowDown className="absolute w-10 h-10 bottom-8 animate-bounce" />
          </div>
        ) : (
          <div className="flexCenter text-2xl font-semibold">
            <p>
              🔎 원하는 조건을 선택하고 <b className="text-orange-400">랜덤으로 웹툰을</b> 찾아보세요.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-8 py-6 border border-gray-400">
        {infoType.map(({ title, content }, typeIndex) => (
          <div key={typeIndex} className="w-5/6 flex items-center gap-10 text-gray-700 font-semibold">
            <p className="text-xl border-gray-400">{title}</p>
            <div className="flex gap-4">
              {content.map((el, contentIndex) => (
                <button
                  key={contentIndex}
                  type="button"
                  className={`px-3 py-2 rounded-lg font-medium hover:bg-orange-400 hover:text-white ${handleRoleBtn(typeIndex, contentIndex)}`}
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
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-xl font-medium mt-4 px-6 py-3 rounded-md text-white ${
          !(selectedName[0].length && selectedName[1].length) ? "bg-gray-400" : "bg-orange-400"
        }`}
        disabled={!(selectedName[0].length && selectedName[1].length)}
        onClick={handleRandomClick}
      >
        RANDOM PICK
      </button>
    </div>
  );
};

export default WebtoonBox;
