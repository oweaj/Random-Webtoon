import axios from "axios";
import Header from "../../components/Header/Header";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export interface webtoonInfo {
  webtoonId: number;
  title: string;
  img: string;
  service: string;
  url: string;
}

export const Main = () => {
  const [webtoonList, setWebtoonList] = useState<webtoonInfo[]>([]);
  const firstRef = useRef<HTMLDivElement | null>(null);
  const secondRef = useRef<HTMLDivElement | null>(null);
  const thirdRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    webtoons();
  }, []);

  const webtoons = async () => {
    try {
      const url = "https://korea-webtoon-api.herokuapp.com?perPage=45";
      const response = await axios.get(url);
      setWebtoonList(response.data.webtoons);
    } catch (error) {
      console.log(error);
    }
  };

  const webtoonFirst = webtoonList.slice(0, webtoonList.length / 3);
  const webtoonSecond = webtoonList.slice(webtoonList.length / 3, (webtoonList.length / 3) * 2);
  const webtoonThird = webtoonList.slice((webtoonList.length / 3) * 2);

  gsap.defaults({ play: true });
  gsap.fromTo(firstRef.current, { x: 900, duration: 25, yoyo: true, repeat: -1, ease: "sine-out" }, { x: -900, duration: 25, yoyo: true, repeat: -1, ease: "sine-out" });
  gsap.fromTo(secondRef.current, { x: -900, duration: 30, yoyo: true, repeat: -1, ease: "sine-out" }, { x: 900, duration: 30, yoyo: true, repeat: -1, ease: "sine-out" });
  gsap.fromTo(thirdRef.current, { x: 900, duration: 30, yoyo: true, repeat: -1, ease: "sine-out" }, { x: -900, duration: 30, yoyo: true, repeat: -1, ease: "sine-out" });

  return (
    <div className="w-full h-screen bg-black">
      {/* <Header /> */}
      <ul className="flex flex-col gap-5 items-center justify-center opacity-50 shadow-xl">
        <div className="flex gap-3" ref={firstRef}>
          {webtoonFirst.map(({ webtoonId, img, title }) => (
            <li key={webtoonId} className="w-52 h-60">
              <img src={img} className="w-full h-full object-cover rounded-lg" alt={title} />
            </li>
          ))}
        </div>
        <div className="flex gap-3" ref={secondRef}>
          {webtoonSecond.map(({ webtoonId, img, title }) => (
            <li key={webtoonId} className="w-52 h-60">
              <img src={img} className="w-full h-full object-cover rounded-lg" alt={title} />
            </li>
          ))}
        </div>
        <div className="flex gap-3" ref={thirdRef}>
          {webtoonThird.map(({ webtoonId, img, title }) => (
            <li key={webtoonId} className="w-52 h-60">
              <img src={img} className="w-full h-full object-cover rounded-lg" alt={title} />
            </li>
          ))}
        </div>
      </ul>
      <div className="h-full"></div>
    </div>
  );
};
