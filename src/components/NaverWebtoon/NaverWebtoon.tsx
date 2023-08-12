import axios from "axios";
import { useEffect, useState } from "react";
import { webtoonInfo } from "../../pages/Main/Main";
import Header from "../Header/Header";

const NaverWebtoon = () => {
  const [naverWebtoon, setNaverWebToon] = useState<webtoonInfo[]>([]);

  useEffect(() => {
    naverWebToons();
  }, []);

  const naverWebToons = async () => {
    try {
      const url = "https://korea-webtoon-api.herokuapp.com?service=naver&perPage=20";
      const response = await axios.get(url);
      console.log(response);
      setNaverWebToon(response.data.webtoons);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="w-11/12 h-screen mx-auto">
        <ul className="w-full h-full flex flex-row flex-wrap items-center gap-4">
          {naverWebtoon.map(({ webtoonId, title, img, service, url }) => (
            <li key={webtoonId} className="w-60 h-auto flex flex-col items-center justify-center gap-3">
              <div className="w-full h-auto">
                <a href={url}>
                  <img src={img} alt={title} />
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

export default NaverWebtoon;
