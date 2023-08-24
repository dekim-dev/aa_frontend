import { Route, Routes } from "react-router-dom";
import { styled } from "styled-components";
import Menu from "../components/MyPage/Menu";
import TodoList from "../components/MyPage/TodoList/TodoList";
import DiaryList from "../components/MyPage/Diary.js/DiaryList";
import InfoEditor from "../components/MyPage/MySetting/InfoEditor";

const ParentWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

const MyPage = () => {
  return (
    <ParentWrapper>
      <Menu />
      <Routes>
        <Route path="/tdlist" element={<TodoList />} />
        <Route path="/diary" element={<DiaryList />} />
        <Route path="/setting" element={<InfoEditor />} />
      </Routes>
    </ParentWrapper>
  );
};
export default MyPage;
