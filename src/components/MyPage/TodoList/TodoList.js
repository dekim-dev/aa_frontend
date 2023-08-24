import { styled } from "styled-components";
import StyledCalendar from "../StyledCalendar";
import DailyTodoList from "./DailyList";
import { useState } from "react";

const ParentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: 768px) {
  }
`;

const TodoList = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  return (
    <ParentWrapper>
      <DailyTodoList selectedDate={selectedDate} />
      <StyledCalendar onDateSelect={handleDateSelect} />
    </ParentWrapper>
  );
};
export default TodoList;
