import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Header/Header";

export interface webtoonInfo {
  webtoonId: number;
  title: string;
  img: string;
  service: string;
  url: string;
}

export const NaverWebtoon = () => {
  const [webtoonList, setWebToonList] = useState<webtoonInfo[]>([]);

  useEffect(() => {
    webtoon();
  }, []);

  const webtoon = async () => {
    try {
      const url = "https://korea-webtoon-api.herokuapp.com?service=naver&perPage=20";
      const response = await axios.get(url);
      console.log(response);
      setWebToonList(response.data.webtoons);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(webtoonList);

  return (
    <div className="h-screen">
      <Header />
      <ul className="w-full h-full flex flex-row flex-wrap items-center gap-4">
        {webtoonList.map(({ webtoonId, title, img, service, url }) => (
          <li key={webtoonId} className="w-60 h-auto flex flex-col items-center justify-center gap-3">
            <div className="w-full h-auto">
              <a href={url}>
                <img src={img} className="w-full h-auto object-cover" alt={title} />
              </a>
            </div>
            <div className="text-sm">
              <span>{title}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
