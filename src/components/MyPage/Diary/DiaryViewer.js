import { useEffect, useState } from "react";
import { getDiaryList } from "../../../service/ApiService";

const DiaryViewer = () => {
  const [diaryList, setDiaryList] = useState([]);

  const getDiaries = async () => {
    try {
      const response = await getDiaryList();
      setDiaryList(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDiaries();
  }, []);

  return (
    <>
      {diaryList.map((diary) => (
        <div key={diary.id}>
          <p>{diary.title}</p>
          <p>{diary.content}</p>
          <p>{diary.conclusion}</p>
        </div>
      ))}
    </>
  );
};
export default DiaryViewer;
