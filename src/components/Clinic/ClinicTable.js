import React, { useEffect, useState } from "react";
import {
  getClinicList,
  getClinicListByAddress,
  getClinicListByKeyword,
  getClinicListByRecommendCount,
} from "../../service/ApiService";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import MobileClinicTable from "./MobileClinicTable";
import WebClinicTable from "./WebClinicTable";
import Pagination from "../common/Pagination";
import SearchBar from "./SearchBar";

const ParentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    text-align: center;
  }
  .pagination {
    align-self: center;
  }
  .search {
    align-self: center;
  }
  .order-selector {
    align-self: center;

    width: 80%;
    margin-top: -1rem;
    margin-bottom: -0.8rem;
  }
`;

const ClinicTable = ({ isMobile }) => {
  const [clinicList, setClinicList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState();
  const [searchAddress, setSearchAddress] = useState("");
  const [order, setOrder] = useState("default"); // default는 기본 정렬

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageSize = queryParams.get("pageSize") || 10;

  const fetchData = async (page) => {
    try {
      let response;

      if (searchKeyword) {
        response = await getClinicListByKeyword(
          searchKeyword,
          page - 1, // 사용자에게 보이는 페이지 번호에서 1을 뺀 값 (인덱스 값)
          pageSize
        );
      } else if (searchAddress) {
        response = await getClinicListByAddress(
          searchAddress,
          page - 1,
          pageSize
        );
      } else if (order === "recommend") {
        response = await getClinicListByRecommendCount(page - 1, pageSize);
        console.log(response);
      } else {
        response = await getClinicList(page - 1, pageSize);
        console.log(response);
      }

      if (response) {
        const clinicData =
          searchKeyword || searchAddress || order === "recommend"
            ? response.clinics
            : response.content;
        setClinicList(clinicData);
        setTotalResults(
          searchKeyword || searchAddress || order === "recommend"
            ? response.totalResults
            : response.totalElements
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, pageSize, order]);

  const TableComponent = isMobile ? MobileClinicTable : WebClinicTable;

  const handleSearch = () => {
    setCurrentPage(1);
    setSearchKeyword("");
    setSearchAddress("");
    setOrder("default");
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalResults / pageSize)) {
      setCurrentPage(newPage);
    }
  };

  const handleOrderChange = (selectedOrder) => {
    setCurrentPage(1);
    setOrder(selectedOrder);
  };

  return (
    <ParentWrapper>
      <h2>병원 리스트</h2>
      <SearchBar
        className="search"
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        searchAddress={searchAddress}
        setSearchAddress={setSearchAddress}
        handleSearch={handleSearch}
        fetchData={fetchData}
      />
      {/* <div className="order-selector">
        <label>
          <select
            value={order}
            onChange={(e) => handleOrderChange(e.target.value)}
          >
            <option value="default"> - </option>
            <option value="recommend">추천 수</option>
          </select>
        </label>
      </div> */}
      <TableComponent clinicList={clinicList} />
      <Pagination
        className="pagination"
        currentPage={currentPage}
        totalPages={Math.ceil(totalResults / pageSize)} // 전체 페이지 수 계산
        onPageChange={handlePageChange}
      />
    </ParentWrapper>
  );
};

export default ClinicTable;
