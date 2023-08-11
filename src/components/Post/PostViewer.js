import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { post } from "../../service/ApiService";

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
        console.log(err);
      });
  }, [postId]);
  return (
    <>
      <h2>Post Viewer</h2>
      {postData && (
        <div>
          <h3>닉네임 : {postData.nickname}</h3>
          <h3>글제목 : {postData.title}</h3>
          <p>글내용:{postData.content}</p>
        </div>
      )}
    </>
  );
};
export default PostViewer;
