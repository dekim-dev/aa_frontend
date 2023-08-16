import { useEffect, useState } from "react";
import { getClinicList } from "../../service/ApiService";
import { useLocation } from "react-router-dom";
import MobileClinicTable from "./MobileClinicTable";
import WebClinicTable from "./WebClinicTable";

const ClinicTable = ({ isMobile }) => {
  const [clinicList, setClinicList] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || 0;
  const pageSize = queryParams.get("pageSize") || 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getClinicList(page, pageSize);
        if (response) {
          setClinicList(response.content);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page, pageSize]);

  const TableComponent = isMobile ? MobileClinicTable : WebClinicTable;

  return (
    <>
      <TableComponent clinicList={clinicList} />
    </>
  );
};
export default ClinicTable;
