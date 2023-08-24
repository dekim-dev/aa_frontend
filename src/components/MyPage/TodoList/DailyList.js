import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { TodoItems } from "../../../DummyData";

const ParentWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid black;
  border-radius: 10px;
  .todo_item_container {
    display: flex;
    align-items: center;
  }

  .todo_item_title {
    display: flex;

    padding: 0.2rem;
    border-radius: 4px;
  }
  .morning {
    background-color: #fcd19f;
  }
  .afternoon {
    background-color: #ececec;
  }
  .evening {
    background-color: #c3beff;
  }
  .todo_item_priority_1 {
    font-size: 0.4rem;
    font-weight: bold;
    margin-left: 0.2rem;
    color: red;
  }
  .todo_item_priority_2 {
    font-size: 0.4rem;
    font-weight: bold;
    margin-left: 0.2rem;
    color: orangeRed;
  }
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  width: 20px; /* 원하는 너비 설정 */
  height: 20px; /* 원하는 높이 설정 */
`;

const DailyTodoList = ({ selectedDate }) => {
  const [dailyTodoList, setDailyTodoList] = useState([]);

  useEffect(() => {
    // TodoItems를 복제하여 원본 데이터를 유지하고 정렬된 목록을 생성
    const sortedTodoList = [...TodoItems];

    // 시간대와 우선순위로 정렬
    sortedTodoList.sort((a, b) => {
      // 시간대가 다르면 시간대로 정렬
      const timeOfDayOrder = ["MORNING", "AFTERNOON", "EVENING"];
      const timeOfDayA = a.timeOfDay;
      const timeOfDayB = b.timeOfDay;

      if (
        timeOfDayOrder.indexOf(timeOfDayA) !== -1 &&
        timeOfDayOrder.indexOf(timeOfDayB) !== -1
      ) {
        const timeComparison =
          timeOfDayOrder.indexOf(timeOfDayA) -
          timeOfDayOrder.indexOf(timeOfDayB);

        if (timeComparison === 0) {
          // 시간대가 같으면 우선순위로 정렬
          return a.priority - b.priority;
        }

        return timeComparison;
      }

      return 0;
    });

    setDailyTodoList(sortedTodoList);
  }, []);

  const getTimeOfDay = (timeOfDay) => {
    if (timeOfDay === "MORNING") {
      return "morning";
    } else if (timeOfDay === "AFTERNOON") {
      return "afternoon";
    } else if (timeOfDay === "EVENING") {
      return "evening";
    }
    return "";
  };

  const getPriority = (priority) => {
    if (priority === 1) {
      return "매우중요";
    } else if (priority === 2) {
      return "중요";
    }
    return "";
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = weekdays[date.getDay()]; // 요일을 한글로 변환
    return `${year}-${month}-${day} (${dayOfWeek})`;
  };

  return (
    <ParentWrapper>
      <h2>{formatDate(selectedDate)}</h2>
      {dailyTodoList &&
        dailyTodoList.map((item) => (
          <div className="todo_item_container" key={item.id}>
            <Checkbox type="checkbox" />
            <div className={`todo_item_title ${getTimeOfDay(item.timeOfDay)}`}>
              {item.itemName}
            </div>
            <div className={`todo_item_priority_${item.priority}`}>
              {getPriority(item.priority)}
            </div>
          </div>
        ))}
    </ParentWrapper>
  );
};
export default DailyTodoList;
