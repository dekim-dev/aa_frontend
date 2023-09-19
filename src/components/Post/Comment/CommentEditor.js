import { useState } from "react";
import { styled } from "styled-components";
import {
  createClinicComment,
  createComment,
} from "../../../service/ApiService";

const ParentWrapper = styled.div`
  margin: 1rem auto;
  width: 80%;
  padding: 1rem;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  gap: 1rem;
  text-align: center;
  input {
    width: 100%;
  }
`;

const CommentEditor = ({ postId, onCommentAdd, clinicId }) => {
  const [content, setContent] = useState("");

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    const requestData = {
      content: content,
    };
    try {
      if (postId != null) {
        // 글 수정일 경우 updatePost 함수 호출
        const response = await createComment(requestData, postId);
        console.log("댓글 등록 성공: ", response);
        alert("댓글이 등록되었습니다.");
        setContent("");
        onCommentAdd(response); // 새로운 댓글을 추가하는 콜백 호출
      } else if (clinicId != null) {
        const response = await createClinicComment(requestData, clinicId);
        console.log("댓글 등록 성공: ", response);
        alert("댓글이 등록되었습니다.");
        setContent("");
        onCommentAdd(response); // 새로운 댓글을 추가하는 콜백 호출
      }
    } catch (error) {
      console.error("댓글 등록 실패: ", error);
    }
  };

  return (
    <ParentWrapper>
      <div>
        <p>프사</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          value={content}
          onChange={handleContentChange}
        ></input>
      </div>
      <div>
        <button onClick={handleSubmit}>등록</button>
      </div>
    </ParentWrapper>
  );
};
export default CommentEditor;
