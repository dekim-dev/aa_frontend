import { styled } from "styled-components";
import { deleteComment, updateComment } from "../../../service/ApiService";
import { useState } from "react";

const ParentWrapper = styled.div`
  margin: 1rem auto;
  width: 80%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .map_container {
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid #ececec;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
  }
  .content {
    width: 100%;
  }
  .button_wrapper {
    text-align: center;
  }

  .button_wrapper > :nth-child(2) {
    margin-left: 0.4rem;
  }
`;

const CommentViewer = ({
  commentData,
  postId,
  userId,
  onCommentDelete,
  onCommentUpdate,
}) => {
  const [editMode, setEditMode] = useState({});
  const [editedContent, setEditedContent] = useState({});

  const handleClickEditBtn = (commentId) => {
    // 댓글을 수정상태로 변경
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [commentId]: !prevEditMode[commentId],
    }));

    setEditedContent((prevEditedContent) => ({
      // 해당 댓글내용 받아서 초기화
      ...prevEditedContent,
      [commentId]: commentData.find((comment) => comment.id === commentId)
        ?.content,
    }));
  };

  const handleSaveEdit = async (commentId) => {
    try {
      const response = await updateComment(commentId, editedContent[commentId]);
      console.log(response);
      alert("댓글이 수정되었습니다.");

      setEditMode((prevEditMode) => ({
        // 수정모드 초기화
        ...prevEditMode,
        [commentId]: false,
      }));

      setEditedContent((prevEditedContent) => ({
        ...prevEditedContent,
        [commentId]: "",
      }));

      onCommentUpdate(commentId, editedContent[commentId]); // 댓글 배열 업데이트
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDeleteBtn = async (commentId) => {
    try {
      const response = await deleteComment(commentId);
      console.log(response);
      alert("댓글이 삭제되었습니다.");
      onCommentDelete(commentId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ParentWrapper>
      {commentData.map((comment) => (
        <div className="map_container" key={comment.id}>
          <p>{comment.nickname}</p>
          {editMode[comment.id] ? (
            // 수정 모드
            <input
              type="text"
              value={editedContent[comment.id]}
              onChange={(e) =>
                setEditedContent({
                  ...editedContent,
                  [comment.id]: e.target.value,
                })
              }
            />
          ) : (
            <div className="content">{comment.content}</div>
          )}

          {comment.userId === userId ? (
            <div className="button_wrapper">
              {editMode[comment.id] ? (
                <button onClick={() => handleSaveEdit(comment.id)}>저장</button>
              ) : (
                <button onClick={() => handleClickEditBtn(comment.id)}>
                  수정
                </button>
              )}
              <button onClick={() => handleClickDeleteBtn(comment.id)}>
                삭제
              </button>
            </div>
          ) : (
            <div className="button_wrapper">
              <button>답글</button>
            </div>
          )}
        </div>
      ))}
    </ParentWrapper>
  );
};
export default CommentViewer;
