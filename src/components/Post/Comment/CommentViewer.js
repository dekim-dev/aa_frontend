import { styled } from "styled-components";
import {
  deleteClinicComment,
  deleteComment,
  updateClinicComment,
  updateComment,
} from "../../../service/ApiService";
import { useState } from "react";
import { UserNicknameBar, UserPfImgBar } from "../../common/UserNameTag";
import { dateFormatWithTime } from "../../../utils/Functions";
import useWindowResize from "../../../utils/useWindowResize";

const ParentWrapper = styled.div`
  margin: 1rem auto;
  width: 80%;
  border: 1px solid #ececec;
  display: flex;
  flex-direction: column;
  .map_container {
    width: 100%;
    padding: 1rem;
    border-bottom: 1px solid #ececec;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    align-items: center;
  }
  .user_info_wrapper {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
  .comment_info_wrapper {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    align-items: center;
    .createdAt {
      font-size: 0.7rem;
      color: gray;
    }
  }
  textarea {
    max-width: 100%;
    min-height: 4rem;
    overflow-y: auto;
    margin-bottom: 0.4rem;
    border: 1px solid silver;
  }
  .content {
    align-self: flex-start;
    margin-left: 2.4rem;
    max-width: 100%;
  }
  .button_wrapper {
    text-align: center;
  }
  .button_wrapper > :nth-child(2) {
    margin-left: 0.4rem;
  }
`;

const MobileWrapper = styled.div`
  width: 80%;
  margin: 1rem auto;
  border: 1px solid #ececec;
  .map_container {
    display: flex;
    flex-direction: column;
    padding: 0.4rem;
    border-bottom: 1px solid #ececec;
  }
  .comment_user_info_wrapper {
    display: flex;
    gap: 0.2rem;
  }
  .nickname_date_wrapper {
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    gap: 0.2rem;
    p {
      color: gray;
      font-size: 0.8rem;
    }
  }
  .content {
    align-self: flex-start;
    margin-left: 2.4rem;
    max-width: 86%;
  }
  .button_wrapper {
    display: flex;
    gap: 0.2rem;
    align-items: center;
    justify-content: end;
  }
  textarea {
    min-width: 80%;
    min-height: 4rem;
    overflow-y: auto;
    margin-bottom: 0.4rem;
    border: 1px solid silver;
  }
`;

const CommentViewer = ({
  commentData,
  clinicId,
  postId,
  userId,
  onCommentDelete,
  onCommentUpdate,
}) => {
  const [editMode, setEditMode] = useState({});
  const [editedContent, setEditedContent] = useState({});
  const isMobile = useWindowResize();

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
      if (postId != null) {
        const response = await updateComment(
          commentId,
          editedContent[commentId]
        );
        console.log(response);
        alert("댓글이 수정되었습니다.");
      } else if (clinicId != null) {
        const response = await updateClinicComment(
          commentId,
          editedContent[commentId]
        );
        console.log(response);
        alert("댓글이 수정되었습니다.");
      }

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
      if (postId != null) {
        const response = await deleteComment(commentId);
        console.log(response);
        alert("댓글이 삭제되었습니다.");
        onCommentDelete(commentId);
      } else if (clinicId != null) {
        const response = await deleteClinicComment(commentId);
        console.log(response);
        alert("댓글이 삭제되었습니다.");
        onCommentDelete(commentId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isMobile ? (
        <MobileWrapper>
          {commentData &&
            commentData.map((comment) => (
              <div className="map_container" key={comment.id}>
                <div className="comment_user_info_wrapper">
                  <UserPfImgBar userPfImg={comment.pfImg} />
                  <div className="nickname_date_wrapper">
                    <UserNicknameBar userNickname={comment.nickname} />
                    <p>{dateFormatWithTime(comment.createdAt)}</p>
                  </div>
                </div>
                {editMode[comment.id] ? (
                  // 수정 모드
                  <textarea
                    className="content"
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
                      <button onClick={() => handleSaveEdit(comment.id)}>
                        저장
                      </button>
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
                    {/* <button>답글</button> */}
                  </div>
                )}
              </div>
            ))}
        </MobileWrapper>
      ) : (
        <ParentWrapper>
          {commentData &&
            commentData.map((comment) => (
              <div className="map_container" key={comment.id}>
                <div className="comment_info_wrapper">
                  <div className="user_info_wrapper">
                    <UserPfImgBar userPfImg={comment.pfImg} />
                    <UserNicknameBar userNickname={comment.nickname} />
                  </div>
                  <div className="createdAt">
                    {dateFormatWithTime(comment.createdAt)}
                  </div>
                </div>

                {editMode[comment.id] ? (
                  // 수정 모드
                  <textarea
                    className="content"
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
                      <button onClick={() => handleSaveEdit(comment.id)}>
                        저장
                      </button>
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
                    {/* <button>답글</button> */}
                  </div>
                )}
              </div>
            ))}
        </ParentWrapper>
      )}
    </>
  );
};
export default CommentViewer;
