import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Main from "./pages/Main/Main";
import { NaverWebtoon } from "./components/NaverWebtoon/NaverWebtoon";
import KakaoWebtoon from "./components/KakaoWebtoon/KakaoWebtoon";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main/naverwebtoon" element={<NaverWebtoon />} />
        <Route path="/main/kakaowebtoon" element={<KakaoWebtoon />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
