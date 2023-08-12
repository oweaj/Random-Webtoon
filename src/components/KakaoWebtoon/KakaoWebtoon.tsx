import axios from "axios";
import { useEffect, useState } from "react";
import { webtoonInfo } from "../../pages/Main/Main";
import Header from "../Header/Header";

const KakaoWebtoon = () => {
  const [kakaoWebtoon, setKakaoWebToon] = useState<webtoonInfo[]>([]);

  useEffect(() => {
    kakaoWebToons();
  }, []);

  const kakaoWebToons = async () => {
    try {
      const url = "https://korea-webtoon-api.herokuapp.com?service=kakao&perPage=20";
      const response = await axios.get(url);
      console.log(response);
      setKakaoWebToon(response.data.webtoons);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="w-11/12 h-screen mx-auto">
        <ul className="w-full h-full flex flex-row flex-wrap items-center gap-4">
          {kakaoWebtoon.map(({ webtoonId, title, img, service, url }) => (
            <li key={webtoonId} className="w-60 h-auto flex flex-col items-center justify-center gap-3">
              <div className="w-full h-auto">
                <a href={url}>
                  <img src={img} className="w-auto h-auto object-cover" alt={title} />
                </a>
              </div>
              <div className="text-sm">
                <span>{title}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default KakaoWebtoon;
