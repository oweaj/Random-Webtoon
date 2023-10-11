import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import WebtoonBox from "../../components/WebtoonBox/WebtoonBox";
import useFetch from "../../hooks/useFetch";

export const Main = () => {
  const firstRef = useRef<HTMLDivElement | null>(null);
  const secondRef = useRef<HTMLDivElement | null>(null);
  const thirdRef = useRef<HTMLDivElement | null>(null);
  const { webtoons, webtoonList } = useFetch();

  useEffect(() => {
    webtoons("perPage=60");
  }, []);

  const webtoonFirst = webtoonList.slice(0, webtoonList.length / 3);
  const webtoonSecond = webtoonList.slice(webtoonList.length / 3, (webtoonList.length / 3) * 2);
  const webtoonThird = webtoonList.slice((webtoonList.length / 3) * 2);

  gsap.defaults({ play: true });
  gsap.fromTo(firstRef.current, { duration: 40, yoyo: true, repeat: -1, ease: "sine-in" }, { x: -1500, duration: 50, yoyo: true, repeat: -1, ease: "sine-inout" });
  gsap.fromTo(secondRef.current, { duration: 50, yoyo: true, repeat: -1, ease: "sine-in" }, { x: 1500, duration: 40, yoyo: true, repeat: -1, ease: "sine-inout" });
  gsap.fromTo(thirdRef.current, { duration: 50, yoyo: true, repeat: -1, ease: "sine-in" }, { x: -1500, duration: 50, yoyo: true, repeat: -1, ease: "sine-inout" });

  return (
    <div className="h-screen bg-black">
      <WebtoonBox />
      <ul className="h-full flexCenter flex-col gap-4 opacity-40">
        <div className="flex gap-3" ref={firstRef}>
          {webtoonFirst.map(({ webtoonId, img, title }) => (
            <li key={webtoonId} className="w-52 h-60">
              <img src={img} className="w-full h-full rounded-lg" alt={title} />
            </li>
          ))}
        </div>
        <div className="flex gap-3" ref={secondRef}>
          {webtoonSecond.map(({ webtoonId, img, title }) => (
            <li key={webtoonId} className="w-52 h-60">
              <img src={img} className="w-full h-full rounded-lg" alt={title} />
            </li>
          ))}
        </div>
        <div className="flex gap-3" ref={thirdRef}>
          {webtoonThird.map(({ webtoonId, img, title }) => (
            <li key={webtoonId} className="w-52 h-60">
              <img src={img} className="w-full h-full rounded-lg" alt={title} />
            </li>
          ))}
        </div>
      </ul>
      <div className="h-full"></div>
    </div>
  );
};
