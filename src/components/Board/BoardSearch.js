import React, { useState } from "react";
import { searchByKeyword } from "../../service/ApiService";

const BoardSearch = () => {
  const [keyword, setKeyword] = useState("");

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const encodedKeyword = encodeURIComponent(keyword);
      const response = await searchByKeyword(encodedKeyword);
      console.log(response);
    } catch (error) {
      console.error("Error searching by keyword:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="검색어 입력"
        value={keyword}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>검색</button>
    </div>
  );
};

export default BoardSearch;
