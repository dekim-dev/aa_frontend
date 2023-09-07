import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { useState } from "react";
import { styled } from "styled-components";

const ImgContainer = styled.img`
  width: 10rem;
  height: 10rem;
`;

const ImgUploadButton = ({ userId, postId }) => {
  const [imgURL, setImgURL] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const onImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImg(file);
    console.log("📌selectedImg: ", selectedImg);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImgURL(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    const storageRef = ref(
      storage,
      `user_pfImg/userId_${userId}_${selectedImg.name}`
    );
    // 유저 프로필사진 저장
    const uploadTask = uploadBytes(storageRef, selectedImg);

    uploadTask.then((snapshot) => {
      setSelectedImg(null);
      setImgURL("");
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log("File available at ", downloadURL);

        // URL에서 토큰 이전 부분만 추출
        const baseUrl = downloadURL.split("?alt=media")[0] + "?alt=media";
        console.log("Media URL: ", baseUrl);

        setImgURL(baseUrl);
        setUploadMessage("업로드 완료되었습니다!");
      });
    });
  };

  return (
    <>
      <input type="file" onChange={onImageChange} />
      {imgURL && <ImgContainer src={imgURL} alt="Uploaded" />}
      {selectedImg && <button onClick={handleUpload}>Upload</button>}
      {uploadMessage && <p>{uploadMessage}</p>}
    </>
  );
};

export default ImgUploadButton;
