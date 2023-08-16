import { Link } from "react-router-dom";
import { styled } from "styled-components";

const StyledTable = styled.table`
  margin: 0 auto;
  width: 80%;
  height: 100vh;
  border-collapse: collapse;
  text-align: left;
  thead {
    border-top: 1px solid #000;
  }
  tbody tr:hover {
    background-color: #ececec;
  }
  th,
  td {
    border-bottom: 1px solid grey;
    padding: 1rem 0.6rem 1rem 0.6rem;
  }
  .clinic_name,
  .clinic_addr,
  .clinic_tel {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .clinic_name {
    min-width: 20%;
    font-weight: 500;
    &:hover {
      font-weight: bold;
      text-decoration: underline;
      text-underline-position: under;
    }
  }
`;

const WebClinicTable = ({ clinicList }) => {
  return (
    <>
      <div>
        <StyledTable>
          <thead>
            <tr>
              <th>병원이름</th>
              <th>주소</th>
              <th>전화번호</th>
            </tr>
          </thead>
          <tbody>
            {clinicList.map((clinic) => (
              <tr key={clinic.id}>
                <td className="clinic_name">
                  <Link to={`/clinic/${clinic.id}`}>{clinic.name}</Link>
                </td>
                <td className="clinic_addr">{clinic.address}</td>
                <td className="clinic_tel">{clinic.tel}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </div>
    </>
  );
};

export default WebClinicTable;
