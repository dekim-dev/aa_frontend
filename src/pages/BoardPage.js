import React from "react";
import styled from "styled-components";
import BoardTable from "../components/Board/BoardTable";
import BoardSearch from "../components/Board/BoardSearch";
import Pagination from "../components/Board/Pagination";

const ParentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h2 {
    text-align: center;
  }
`;

const BoardPage = ({ boardName }) => {
  const boardNo = boardName.substring(boardName.length - 1);

  return (
    <ParentWrapper>
      <h2>게시판 {boardNo}</h2>
      <BoardSearch />
      <BoardTable boardName={boardName} />
      <Pagination />
    </ParentWrapper>
  );
};
export default BoardPage;
