import { useContext, useEffect, useRef, useState } from "react";
import PostViewer from "../components/Post/PostViewer";
import { usePostStore } from "../store";
import { increaseViewCount, post } from "../service/ApiService";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PostPage = () => {
  const { postId } = useParams();
  const { userId } = useContext(UserContext);
  const postStoreRef = useRef(usePostStore()); // useRef를 사용하여 postStore 저장
  const [postData, setPostData] = useState({});
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 먼저 조회수 증가를 처리
        await increaseViewCount(postId);
        console.log("postId: ", postId);

        // 그 다음에 게시글 데이터를 가져옴
        const response = await post(postId);
        setPostData(response);
        postStoreRef.current.setPost({ post: response }); // useRef로부터 postStore 참조..
        console.log(postStoreRef.current.post);

        // userId와 response.userId를 비교하여 수정&삭제 버튼 표시
        if (userId === response.userId) {
          setCanEdit(true);
        }
      } catch (err) {
        console.log("게시글 불러오기 에러", err);
      }
    };

    fetchData(); // fetchData 함수 호출
  }, [postId, userId]);

  return (
    <>
      <PostViewer postData={postData} canEdit={canEdit} postId={postId} />
    </>
  );
};
export default PostPage;
