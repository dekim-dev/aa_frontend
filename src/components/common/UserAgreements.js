import styled from "styled-components";

const ParentWrapper = styled.div`
  margin: 70px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 1rem;
  line-height: 1.8;

  h1 {
    font-size: 3em;
  }
  .term {
  }
  .term_title {
    font-weight: bold;
  }
  ol {
    list-style-type: decimal;
    margin-left: 18px;
  }
  ul {
    margin-left: 18px;
  }
  .ul_square {
    list-style-type: square;
  }
  .ul_disc {
    list-style-type: disc;
  }
  @media screen and (max-width: 768px) {
    margin: 20px;
    h1 {
      font-size: 3em;
    }
  }
`;

const UserAgreements = () => {
  return (
    <ParentWrapper>
      <h1>이용 약관</h1>
      <div className="term 1">
        <p className="term_title">제1조 (목적)</p>
        <ul className="ul_square">
          <li>
            이 약관은, Appropriate Attention(이하 "회사")가 제공하는
            서비스('http://...'이하 “서비스”)를 이용하고자 하는 이용자(이하
            "회원")간의 권리와 의무 및 기타 제반사항을 명확히 하는 것을 목적으로
            합니다.
          </li>
        </ul>
      </div>
      <div className="term 2">
        <p className="term_title">제2조 (용어의 정의)</p>
        <ul className="ul_square">
          <li>
            본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
            <br />
            <ol>
              <li>
                “서비스”란 이용자가 회사의 서비스를 이용할 수 있도록 "회사"가
                제공하는 회원의 일상등에 대한 공유를 위한 웹/앱 플랫폼 서비스
                일체를 의미합니다.
              </li>
              <li>
                "회원"이란 "회사"의 서비스에 가입하여 고유번호를 부여 받은 후
                이를 이용하는 사람을 의미합니다.
              </li>
            </ol>
          </li>
        </ul>
      </div>
      <div className="term 3">
        <p className="term_title">제3조 (약관의 효력)</p>
        <ol>
          <li>
            회사는 본 약관을 "회사" 서비스 화면에 게시하여, 서비스를 이용하고자
            하는 "회원"이 본 약관을 확인할 수 있도록 하여야 합니다.
          </li>
          <li>
            본 약관에 의해 "서비스"를 이용하고자 하는 자는 이 약관의 내용을
            숙지하고 "회원"과 "회사"간의 권리, 의무관계에 대해 동의함을
            확인합니다.
          </li>
          <li>
            "회사"는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 이 약관을
            개정할 수 있으며, 이 경우 개정 내용과 적용 일자를 명시하여 "회사"
            서비스를 통해 그 적용일자 7일 전부터 적용일자 전일까지 공지합니다.
            다만 변경 내용이 "회원"에게 불리한 변경의 경우, 개정약관의 적용일자
            30일 전부터 적용일자까지 공지합니다.
          </li>
          <li>
            "회원"이 개정약관에 동의하지 않는 경우 개정 약관의 적용일 이전에
            거부 의사를 표시하고 이 약관에 대한 동의를 해지할 수 있습니다.
          </li>
          <li>
            "회사"가 본 조 3항에 따라 개정약관을 공지하면서 "회원"에게 적용일
            전까지 의사표시를 하지 않으면 의사 표시가 표명된 것으로 본다는 뜻을
            명확하게 공지하였음에도 "회원"이 명시적으로 거부 의사를 표명하지
            아니한 경우 개정약관에 동의한 것으로 봅니다.
          </li>
        </ol>
      </div>
      <div className="term 4">
        <p className="term_title">제4조 (이 약관의 성립)</p>
        <ol>
          <li>
            이 약관은 "서비스"를 이용하고자하는 자가 이 약관에 동의하고 "회사"가
            정한 절차에 따라 "서비스" 이용 신청을 하며, 이에 대해 "회사"가
            승낙함으로써 성립합니다. "회사"는 이용승낙의 의사표시를 해당 서비스
            화면에 게시하거나 전자우편 또는 기타 방법으로 할 수 있습니다.
          </li>
          <li>이 "회사"의 "서비스" 이용은 14세 이상 부터 가능합니다.</li>
        </ol>
      </div>
      <div className="term 5">
        <p className="term_title">제5조 (정보 제공 및 광고의 게재)</p>
        <ol>
          <li>
            "회원"은 "서비스" 이용 시 서비스 화면 상 노출되는 광고 게재에 대해
            동의합니다.
          </li>
          <li>
            "회원"이 "서비스"상에 개제되어 있는 광고를 이용할 경우, 이는
            전적으로 "회원"과 광고주 간의 법률관계이므로, 그로인해 발생한
            "회원"과 광고주간 분쟁 들 제반 문제는 "회원"과 광고주간에 직접
            해결하여야 하며, 이와 관련하여 "회사"는 어떠한 책임도 지지 않습니다.
          </li>
        </ol>
      </div>
      <div className="term 6">
        <p className="term_title">제6조 (비밀유지의무)</p>
        <ol>
          <li>
            이 약관과 관련하여 상대방으로부터 제공받은 모든 정보는 다음 각 호
            어느 하나에 해당하는 경우를 제외하고는 비밀로 하고, 이 약관상의 권리
            또는 의무를 이행하기 위한 목적 이외에 이를 사용하거나 제3자에게
            제공할 수 없습니다.
            <ul className="ul_disc">
              <li>당사자들이 공개하기로 합의한 사항</li>
              <li>공지된 정보</li>
              <li>
                정보를 제공받은 당사자가 제3자로부터 이미 적법하게 취득한 정보
              </li>
              <li>
                법률에 특별한 규정이 있거나 법령을 준수하기 위하여 불가피하게
                정보를 제공하여야 하는 경우
              </li>
            </ul>
          </li>
          <li>
            본 조의 비밀유지의무는 이 약관이 이행되지 않거나 해지 기타 사유로
            종료된 경우에도 그 때로부터 2년간 유효합니다.
          </li>
        </ol>
      </div>
      <div className="term 7">
        <p className="term_title">제7조 (회원 탈퇴 및 자격 상실 등)</p>
        <ol>
          <li>
            "회원"은 "회사"에 언제든지 탈퇴를 요청할 수 있으며 "회사"는 즉시
            회원탈퇴를 처리하며 해당 "회원"의 작성글을 포함한 모든 정보를
            영구삭제 합니다.
          </li>
        </ol>
      </div>
      <div className="term 8">
        <p className="term_title">제8조 (면책)</p>
        <ol>
          <li>
            "회사"는 "회원"들 사이의 정보 공유를 위한 시스템만을 제공할 뿐, 해당
            정보 또는 정보 이용에 대한 분쟁이 발생한 경우, 그 분쟁의 결과로 인한
            책임은 "회원"이 부담합니다. 제3자가 "회사"를 상대로 민/형사상 등의
            문제를 제기하는 경우 "회원"은 문제의 해결을 위하여 필요한 정보를
            제공하는 등 적극 협조하여야 하며, 이와 관련하여 "회사"에 손해 또는
            비용이 발생하는 경우 이를 배상 또는 보상합니다.
          </li>
          <li>
            "회사"는 적법한 권리자의 요구가 있거나, 컴퓨터 등 정보통신설비의
            보수, 점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우
            "회사"의 "서비스" 제공을 일시적으로 중단할 수 있으며, 이와 관련하여
            "회사"는 고의 또는 중대한 과실이 없는 한 책임을 부담하지 않습니다.
          </li>
        </ol>
      </div>
      <div className="term 9">
        <p className="term_title">제9조 (약관 개정)</p>
        <ol>
          <li>
            약관 변경시 "회사"는 "서비스"를 통해 공지하며, 공지일로부터 7일 후
            적용됩니다. "회원"이 변경되는 약관 내용에 대해 이의가 있는 경우 7일
            이내에 제기할 수 있으며, "회사"가 약관 변경을 명확하게 알리거나
            통지하였음에도 불구하고 7일 이내에 "회원"이 거부 의사를 명시적으로
            나타내지 않는 경우에는, "회원"은 약관의 개정에 동의하는 것으로
            간주됩니다.
          </li>
        </ol>
      </div>
      <div className="term 10">
        <p className="term_title">제10조 (분쟁의 해결)</p>
        <ol>
          <li>
            이 약관으로 인하여 또는 이 약관과 관련하여 분쟁이 발생하는 경우
            당사자들은 일차적으로 협의를 통한 원만한 해결을 도모합니다.
          </li>
          <li>
            제1항에 의한 협의가 이루어지지 않는 경우 이 약관으로 인하여 또는 이
            약관과 관련하여 발생하는 모든 분쟁의 해결은 서울중앙지방법원을
            제1심의 합의관할로 하는 소송에 의합니다.
          </li>
        </ol>
      </div>
      ■ 적용 일자 : 2023년 11월 25일
      <br />
    </ParentWrapper>
  );
};
export default UserAgreements;
