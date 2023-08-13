import React from "react";
import styled from "styled-components";

const ParentWrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BoardSearch = () => {
  return (
    <ParentWrapper>
      <select>
        <option>선택</option>
        <option>말머리1</option>
        <option>말머리2</option>
        <option>말머리3</option>
      </select>
      <div>
        <input type="text"></input> <button>검색</button>
      </div>
    </ParentWrapper>
  );
};
export default BoardSearch;
