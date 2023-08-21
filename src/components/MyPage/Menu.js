import { Link } from "react-router-dom";
import { styled } from "styled-components";

const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Menu = () => {
  return (
    <>
      <ParentContainer>
        <Link to="/mypage/tdlist">Todo List</Link>
        <Link to="/mypage/diary">Diary List</Link>
        <Link to="/mypage/setting">Setting</Link>
      </ParentContainer>
    </>
  );
};
export default Menu;
