import { useState } from "react";
import axios from "axios";

export interface webtoonInfo {
  webtoonId: number;
  title: string;
  img: string;
  service: string;
  url: string;
}

const useFetch = () => {
  const [webtoonList, setWebtoonList] = useState<webtoonInfo[]>([]);
  const [status, setStatus] = useState(0);

  const webtoons = async (type: string) => {
    try {
      const url = `https://korea-webtoon-api.herokuapp.com?${type}`;
      const response = await axios.get(url);
      setStatus(response.status);
      setWebtoonList(response.data.webtoons);
    } catch (error) {
      console.log(error);
    }
  };

  return { webtoons, webtoonList, status };
};

export default useFetch;
