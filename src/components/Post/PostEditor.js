import { useState } from "react";
import { styled } from "styled-components";
import InputField from "../common/TextField";
import { createPost } from "../../service/ApiService";

const ParentWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const StyledTextField = styled.input``;
const StyledTextArea = styled.textarea`
  width: 300px;
  height: 500px;
`;
const StyledButton = styled.button``;

const PostEditor = () => {
  const [state, setState] = useState({
    title: "",
    content: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const requestData = {
      title: state.title,
      content: state.content,
    };

    createPost(requestData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error posting:", error);
      });
  };
  return (
    <ParentWrapper>
      <h1>글쓰기 페이지</h1>
      <InputField
        label="글 제목"
        type="text"
        name="title"
        value={state.title}
        onChange={handleChangeState}
        width={"250px"}
      />
      <StyledTextArea
        name="content"
        value={state.content}
        onChange={handleChangeState}
      />
      <StyledButton onClick={handleSubmit}>등 록</StyledButton>
    </ParentWrapper>
  );
};
export default PostEditor;
