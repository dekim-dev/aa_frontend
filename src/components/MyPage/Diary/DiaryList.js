import { useEffect, useState } from "react";
import { getDiaryList } from "../../../service/ApiService";

const DiaryList = () => {
  const [diaryList, setDiaryList] = useState([]);

  const getDiaries = async () => {
    try {
      const response = await getDiaryList();
      setDiaryList(response.content);
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
          {diary.medicationLists.map((medication, index) => (
            <div key={index}>
              <p>{medication.med}</p>
              <p>{medication.takenAt}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
export default DiaryList;
