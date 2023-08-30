import React from "react";
import styled from "styled-components";
import BoardTable from "../components/Board/BoardTable";
import BoardSearch from "../components/Board/BoardSearch";
import WriteButton from "../components/Post/WriteButton";
import {
  FreeBoardTopics,
  QnABoardTopics,
} from "../components/Post/TopicSelectBox";

const ParentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h2 {
    text-align: center;
  }
  .search_bar {
    margin: 0 auto;
    width: 80%;
    display: flex;
    align-item: center;
    justify-content: space-between;
  }
`;

const koreanBoardNames = {
  free: "자유게시판",
  qna: "질문게시판",
  best: "베스트게시판",
  notice: "공지사항",
  clinic: "병원찾기게시판",
};

const BoardPage = ({ boardName }) => {
  const koreanBoardName = koreanBoardNames[boardName] || boardName;
  return (
    <ParentWrapper>
      <h2> {koreanBoardName}</h2>
      <div className="search_bar">
        <div className="select_box">
          {boardName === "free" && <FreeBoardTopics />}
          {boardName === "qna" && <QnABoardTopics />}
        </div>
        <BoardSearch />
      </div>
      <BoardTable boardName={boardName} />
      {!(boardName === "notice") && <WriteButton />}
    </ParentWrapper>
  );
};
export default BoardPage;
