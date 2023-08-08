import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <Link to="/">
        <p>랜딩페이지로 이동</p>
      </Link>
      <Link to="/main">
        <p>메인페이지로 이동</p>
      </Link>
      <Link to="/signin">
        <p>로그인페이지로 이동</p>
      </Link>
      <Link to="/signup">
        <p>회원가입페이지로 이동</p>
      </Link>
    </div>
  );
};

export default Landing;
