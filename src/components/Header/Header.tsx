import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Header = () => {
  const handleSearch = () => {
    console.log("검색");
  };

  return (
    <div className="flex flex-row items-center justify-between px-12 text-lg font-semibold bg-gray-300">
      <Link to="/main">
        <h1 className="w-56 text-2xl">Webtoon Pick</h1>
      </Link>
      <div className="flex flex-row gap-8 py-3">
        <Link to="/main/naverwebtoon" className="p-5 rounded-lg text-white bg-green-400">
          NAVER WEBTOON
        </Link>
        <Link to="/main/kakaowebtoon" className="p-5 rounded-lg bg-yellow-300">
          KAKAO WEBTOON
        </Link>
      </div>
      <div className="w-56 flex flex-row gap-2 items-center justify-center text-base font-medium">
        <input type="text" className="w-48 py-2 pl-2 rounded-lg placeholder:text-sm" placeholder="웹툰을 검색해보세요." />
        <BsSearch className="w-5 h-5 cursor-pointer" onClick={handleSearch} />
      </div>
    </div>
  );
};

export default Header;
