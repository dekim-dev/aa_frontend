import { Link } from "react-router-dom";
import { styled } from "styled-components";

const ParentContainer = styled.div`
  width: 10rem;
  li {
    border: 1px solid black;
    padding: 1rem;
  }
`;

const Menu = () => {
  return (
    <ParentContainer>
      <ul>
        <li>
          <Link to="/mypage/tdlist">✔ Todo List</Link>
        </li>
        <li>
          <Link to="/mypage/diary">📕 Diary List</Link>
        </li>
        <li>
          <Link to="/mypage/setting">⚙ Setting</Link>
        </li>
      </ul>
    </ParentContainer>
  );
};
export default Menu;
