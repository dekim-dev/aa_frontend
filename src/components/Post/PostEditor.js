import { useState } from "react";
import { styled } from "styled-components";
import { createPost } from "../../service/ApiService";
import { FreeBoardTopics, QnABoardTopics } from "./TopicSelectBox";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ParentWrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const SelectBoxContainer = styled.div`
  width: 80%;
  display: flex;
  gap: 1rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    min-width: 350px;
  }
`;
const StyledTextField = styled.input`
  width: 80%;
  height: 2rem;
  border-radius: 2px;
  border: 1px solid gray;
  @media screen and (max-width: 768px) {
    width: 100%;
    min-width: 350px;
  }
`;

const StyledCkEditor = styled.div`
  width: 80%;
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 400px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    min-width: 350px;
  }
`;

const StyledButton = styled.button`
  width: 4rem;
  height: 2rem;
`;

const BoardSelectBox = ({ onChange }) => {
  return (
    <>
      <select onChange={onChange}>
        <option defaultChecked>게시판 선택</option>
        <option value={"free"}>자유게시판</option>
        <option value={"qna"}>질문게시판</option>
      </select>
    </>
  );
};

const PostEditor = () => {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const [state, setState] = useState({
    title: "",
    content: "",
  });

  const handleBoardChange = (e) => {
    setSelectedBoard(e.target.value);
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const requestData = {
      boardCategory: selectedBoard,
      topic: selectedTopic,
      title: state.title,
      content: state.content,
    };

    try {
      const response = await createPost(requestData);
      console.log(response);
      navigate(`/post/${response.id}`);
    } catch (error) {
      console.error("글 등록 에러", error);
    }
  };
  return (
    <ParentWrapper>
      <SelectBoxContainer>
        <BoardSelectBox onChange={handleBoardChange} />
        {selectedBoard === "free" && (
          <FreeBoardTopics onChange={handleTopicChange} />
        )}
        {selectedBoard === "qna" && (
          <QnABoardTopics onChange={handleTopicChange} />
        )}
      </SelectBoxContainer>
      <StyledTextField
        label="글 제목"
        type="text"
        name="title"
        value={state.title}
        onChange={handleChangeState}
        width="250px"
        placeholder="글 제목을 입력하세요"
      />
      <StyledCkEditor>
        <CKEditor
          editor={ClassicEditor}
          data="<p>내용을 입력하세요.</p>"
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setState({
              ...state,
              content: data,
            });
          }}
        />
      </StyledCkEditor>
      <StyledButton onClick={handleSubmit}>등 록</StyledButton>
    </ParentWrapper>
  );
};
export default PostEditor;
