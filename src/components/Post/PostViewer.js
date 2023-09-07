import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost, post } from "../../service/ApiService";
import { dateFormat } from "../../utils/Functions";
import { styled } from "styled-components";
import { UserContext } from "../../context/UserContext";
import MyButton from "./MyButton";
import { usePostStore } from "../../store";

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
    align-items: center;
    gap: 1rem;
    margin-left: 1rem;
  }
  .profile_nickname_wrapper {
    display: flex;
    align-items: center;
  }
  .profile_img {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
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
  .edit_delete_wrapper {
    align-self: flex-end;
    display: flex;
    gap: 0.6rem;
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
  const navigate = useNavigate();
  const { postId } = useParams();
  const { userId } = useContext(UserContext);
  const [postData, setPostData] = useState({});
  const [canEdit, setCanEdit] = useState(false); // 수정 및 삭제 버튼을 표시할 변수 추가

  const postStore = usePostStore(); // 게시글 저장

  useEffect(() => {
    console.log("postId: ", postId);
    post(postId)
      .then((response) => {
        setPostData(response);
        postStore.setPost({ post: response });
        console.log(postStore);
        console.log(response);
        // userId와 response.userId를 비교하여 수정&삭제 버튼을 표시할지 결정
        if (userId === response.userId) {
          setCanEdit(true);
        }
      })
      .catch((err) => {
        console.log("게시글 불러오기 에러", err);
      });
  }, [postId, userId]);

  const handleDelete = async () => {
    if (window.confirm(`정말 삭제하시겠습니까?`)) {
      try {
        const response = await deletePost(postId);
        console.log(postId);
        console.log("글 삭제 성공", response);
        console.log(postStore);
        navigate(`/board/${postStore.post.post.boardCategory}`);
      } catch (error) {
        console.log("글 삭제 실패", error);
      }
    }
  };

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
            <div className="profile_nickname_wrapper">
              <img
                className="profile_img"
                src={postData.pfImg}
                alt="profile img"
              ></img>
              <p>{postData.nickname}</p>
            </div>
            <p>{dateFormat(postData.createdAt)}</p>
            <p>조회수 {postData.viewCount}</p>
            <p>좋아요 {postData.likes}</p>
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />{" "}
          {canEdit && (
            <div className="edit_delete_wrapper">
              <Link to={`/post/edit/${postId}`}>
                <MyButton text="수정" />
              </Link>
              <MyButton text="삭제" onClick={handleDelete} />
            </div>
          )}
        </ParentWrapper>
      )}
    </Wrapper>
  );
};
export default PostViewer;
