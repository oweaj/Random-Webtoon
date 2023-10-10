import { Route, Routes } from "react-router-dom";
import { Main } from "./pages/Main/Main";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <div className="overflow-hidden">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
