import React from "react";

const BoardPage = ({ boardName }) => {
  const boardNo = boardName.substring(boardName.length - 1);

  return (
    <>
      <h1>게시판 {boardNo}</h1>
    </>
  );
};
export default BoardPage;
