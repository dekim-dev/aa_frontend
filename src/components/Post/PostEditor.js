import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { createPost, updatePost } from "../../service/ApiService";
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

const BoardSelectBox = ({ onChange, selectedBoard }) => {
  return (
    <>
      <select onChange={onChange} value={selectedBoard}>
        <option value={""}>게시판 선택</option>
        <option value={"free"}>자유게시판</option>
        <option value={"qna"}>질문게시판</option>
      </select>
    </>
  );
};

const PostEditor = ({ isEdit, originalData }) => {
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

  const handleChange = (e, name) => {
    setState({
      ...state,
      [name]: e.target.value,
    });
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setState((prevState) => ({
      ...prevState,
      content: data,
    }));
  };

  const handleSubmit = async () => {
    const requestData = {
      boardCategory: selectedBoard,
      topic: selectedTopic,
      title: state.title,
      content: state.content,
    };
    if (isEdit) {
      // 글 수정일 경우 id만 추가
      requestData.id = originalData.post.id;
    }
    try {
      if (isEdit) {
        // 글 수정일 경우 updatePost 함수 호출
        const response = await updatePost(requestData, originalData.post.id);
        console.log("글 수정 성공: ", response);
        navigate(`/post/${response.id}`, { replace: true });
      } else {
        // 글 등록일 경우 createPost 함수 호출
        const response = await createPost(requestData);
        console.log("글 등록 성공: ", response);
        navigate(`/post/${response.id}`, { replace: true });
      }
    } catch (error) {
      console.error("글 작성 또는 수정 실패: ", error);
    }
  };

  useEffect(() => {
    // isEdit이 들어올때만 동작하는 useEffect
    if (isEdit && originalData) {
      setSelectedBoard(originalData.post.boardCategory);
      setSelectedTopic(originalData.post.topic);
      setState({
        title: originalData.post.title,
        content: originalData.post.content,
      });
    }
  }, [isEdit, originalData]);

  return (
    <ParentWrapper>
      <SelectBoxContainer>
        <BoardSelectBox
          onChange={handleBoardChange}
          selectedBoard={selectedBoard}
        />
        {selectedBoard === "free" && (
          <FreeBoardTopics
            onChange={handleTopicChange}
            selectedTopic={selectedTopic}
          />
        )}
        {selectedBoard === "qna" && (
          <QnABoardTopics
            onChange={handleTopicChange}
            selectedTopic={selectedTopic}
          />
        )}
      </SelectBoxContainer>
      <StyledTextField
        label="글 제목"
        type="text"
        name="title"
        value={state.title}
        onChange={(e) => handleChange(e, "title")}
        width="250px"
        placeholder="글 제목을 입력하세요"
      />
      <StyledCkEditor>
        <CKEditor
          editor={ClassicEditor}
          data={state.content} // 초기 데이터 설정
          onChange={handleEditorChange}
        />
      </StyledCkEditor>
      {isEdit ? (
        <StyledButton onClick={handleSubmit}>수 정</StyledButton>
      ) : (
        <StyledButton onClick={handleSubmit}>등 록</StyledButton>
      )}
    </ParentWrapper>
  );
};
export default PostEditor;
