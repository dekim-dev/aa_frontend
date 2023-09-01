export const dateFormat = (inputDate) => {
  // Date 객체 생성
  const date = new Date(inputDate);

  // 년, 월, 일 추출
  const year = String(date.getFullYear()).slice(-2);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 월과 일을 두 자리 문자열로 변환
  const formattedMonth = String(month).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");

  const formattedDate = `${year}/${formattedMonth}/${formattedDay}`;
  return formattedDate;
};
