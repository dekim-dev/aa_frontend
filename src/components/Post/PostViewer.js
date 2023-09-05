import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { post } from "../../service/ApiService";
import { dateFormat } from "../../utils/Functions";
import { styled } from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

const ParentWrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .row {
    display: flex;
    gap: 1rem;
  }
  .title {
    font-size: 1.4rem;
  }
  .post_info_container {
    margin-top: -2rem;
    font-size: 1rem;
  }
  .content {
    border: 1px solid #ececec;
    width: 100%;
    height: 40rem;
    padding: 0.4rem;
  }
`;

export const koreanBoardNames = {
  free: "자유게시판",
  qna: "질문게시판",
  best: "베스트게시판",
  notice: "공지사항",
  clinic: "병원찾기게시판",
};

export const topics = {
  experience: "경험",
  daily: "일상",
  thoughts: "생각",
  treatment: "진료",
  ADHD: "ADHD",
  study: "공부",
  work: "직장",
  etc: "기타",
};

const PostViewer = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState({});

  useEffect(() => {
    console.log("postId: ", postId);
    post(postId)
      .then((response) => {
        setPostData(response);
        console.log(response);
      })
      .catch((err) => {
        console.log("게시글 불러오기 에러", err);
      });
  }, [postId]);

  return (
    <Wrapper>
      {postData && (
        <ParentWrapper>
          <div className="board_topic_container row">
            <p>{koreanBoardNames[postData.boardCategory]}</p>
          </div>
          <div className="title">
            <p>
              [{topics[postData.topic]}] {postData.title}
            </p>
          </div>
          <div className="post_info_container row">
            <p>{postData.nickname}</p>
            <p>{dateFormat(postData.createdAt)}</p>
            <p>조회수 {postData.viewCount}</p>
            <p>좋아요 {postData.likes}</p>
          </div>

          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
        </ParentWrapper>
      )}
    </Wrapper>
  );
};
export default PostViewer;
