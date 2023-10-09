import { Route, Routes } from "react-router-dom";
import { styled } from "styled-components";
import Menu from "../components/MyPage/Menu";
import TodoList from "../components/MyPage/TodoList/TodoList";
import InfoEditor from "../components/MyPage/MySetting/InfoEditor";
import DiaryList from "../components/MyPage/Diary/DiaryList";

const ParentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  @media screen and (max-width: 768px) {
    gap: 0;
  }
`;

const MyPage = () => {
  return (
    <ParentWrapper>
      <Menu />
      <Routes>
        <Route path="/tdlist" element={<TodoList />} />
        <Route path="/diary" element={<DiaryList />} />
        <Route path="/setting/*" element={<InfoEditor />} />
      </Routes>
    </ParentWrapper>
  );
};
export default MyPage;
