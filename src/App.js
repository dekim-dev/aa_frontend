import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import PostPage from "./pages/PostPage";
import PostWritePage from "./pages/PostWritePage";
import NavBar from "./components/common/NavBar";
import BoardPage from "./pages/BoardPage";
import ClinicListPage from "./pages/ClinicListPage";
import ClinicDetailPage from "./pages/ClinicDetailPage";
import MyPage from "./pages/MyPage";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "NanumSquareNeo";
    text-decoration: none;
    list-style: none;
    a {
      text-decoration: none;
      color: black;
      &:visited {
        color: black
      }
    }
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<JoinPage />} />
          <Route path="/post" element={<PostWritePage />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="board1" element={<BoardPage boardName="board1" />} />
          <Route path="board2" element={<BoardPage boardName="board2" />} />
          <Route path="board3" element={<BoardPage boardName="board3" />} />
          <Route path="board4" element={<BoardPage boardName="board4" />} />
          <Route path="/clinic/list" element={<ClinicListPage />} />
          <Route path="/clinic/:clinicId" element={<ClinicDetailPage />} />
          <Route path="/mypage/*" element={<MyPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
