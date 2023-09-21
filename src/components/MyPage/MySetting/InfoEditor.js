import { Link, Route, Routes } from "react-router-dom";
import MyPost from "./MyPost";
import MyComment from "./MyComment";
import MyInfoSetting from "./MyInfoSetting";
import styled from "styled-components";

const ParentWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  nav {
    margin: 1rem auto;
    width: 64%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    padding: 10px 20px;
  }
  ul {
    display: flex;
  }
  li {
    margin-right: 20px; /* 간격 설정 */
  }
`;

const InfoEditor = () => {
  return (
    <ParentWrapper>
      <nav>
        <ul>
          <Link to="/mypage/setting/posts">
            <li>내 글</li>
          </Link>
          <Link to="/mypage/setting/comments">
            <li>내 댓글</li>
          </Link>
          <Link to="/mypage/setting/">
            <li>내 정보</li>
          </Link>
        </ul>
      </nav>
      <Routes>
        <Route path="/posts" element={<MyPost />} />
        <Route path="/comments" element={<MyComment />} />
        <Route path="/" element={<MyInfoSetting />} />
      </Routes>
    </ParentWrapper>
  );
};

export default InfoEditor;
