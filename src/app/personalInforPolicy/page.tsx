import Image from "next/image";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-zinc-800 min-h-screen text-gray-200 py-10">
      <div className="max-w-4xl mx-auto bg-black p-8 shadow-md rounded-lg">
        <div className="flex justify-center">
          <Image
            src="/images/Logo.png"
            alt="logo"
            width={120}
            height={120}
          ></Image>
        </div>

        <h1 className="text-2xl font-bold mb-6">
          크로몹스(ChromOps) 개인정보처리방침
        </h1>
        <p className="text-gray-300 mb-6">
          크로몹스(ChromOps)는 이용자의 개인정보를 중요시하며, 「개인정보
          보호법」 및 관련 법령을 준수하고 있습니다. 본 개인정보처리방침은
          크로몹스가 수집하는 개인정보의 항목, 수집 목적, 보유 및 이용 기간,
          제3자 제공 및 이용자의 권리 등을 명시하고 있습니다.
        </p>

        <h2 className="text-2xl font-semibold text-blue-300 mb-4">
          1. 수집하는 개인정보 항목
        </h2>
        <p className=" mb-6">
          크로몹스는 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.
        </p>
        <ul className="list-disc list-inside  mb-6">
          <li>필수 수집 항목: 이름, 이메일 주소, 전화번호, 주소</li>
          <li>자동 수집 항목: 서비스 이용 기록, 접속 IP 정보, 쿠키</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-300 mb-4">
          2. 개인정보 수집 및 이용 목적
        </h2>
        <p className=" mb-6">
          크로몹스는 수집된 개인정보를 다음의 목적을 위해 사용합니다.
        </p>
        <ul className="list-disc list-inside  mb-6">
          <li>
            이용자 식별 및 회원관리: 이름, 이메일, 전화번호 등을 통해 이용자를
            식별하고, 회원가입 및 로그인 관리를 수행합니다.
          </li>
          <li>
            서비스 제공: 주소, 이메일 등을 활용하여 상품 배송 및 서비스 관련
            정보 제공을 진행합니다.
          </li>
          <li>
            고객 지원: 문의 사항에 대한 대응 및 문제 해결을 위해 이용자의
            연락처를 활용합니다.
          </li>
          <li>
            마케팅 및 광고: 이용자의 동의 하에 이메일 또는 전화번호를 사용하여
            마케팅 정보 및 이벤트 안내를 제공합니다.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-300 mb-4">
          3. 개인정보의 보유 및 이용 기간
        </h2>
        <p className=" mb-6">
          크로몹스는 수집된 개인정보를 법령이 정하는 기간 동안 보유 및 이용하며,
          아래의 기준에 따라 개인정보를 보유합니다.
        </p>
        <ul className="list-disc list-inside  mb-6">
          <li>회원 탈퇴 시: 회원 탈퇴 후 30일 이내 파기</li>
          <li>법령에서 정한 보존 기간: 관련 법령에 따라 일정 기간 동안 보존</li>
          <li>계약 또는 청약철회에 관한 기록: 5년</li>
          <li>소비자 불만 또는 분쟁 처리에 관한 기록: 3년</li>
          <li>전자상거래 등에서의 표시·광고에 관한 기록: 6개월</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-300 mb-4">
          4. 개인정보의 제3자 제공
        </h2>
        <p className=" mb-6">
          크로몹스는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
          단, 법령에 따라 요구되는 경우나 수사기관의 요청에 따라 법률에 의해
          제공해야 할 경우에는 예외로 합니다.
        </p>

        <h2 className="text-2xl font-semibold text-blue-300 mb-4">
          5. 이용자의 권리
        </h2>
        <p className=" mb-6">
          이용자는 언제든지 본인의 개인정보에 대해 다음과 같은 권리를 행사할 수
          있습니다.
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>개인정보 열람 요청</li>
          <li>개인정보 정정 및 삭제 요청</li>
          <li>개인정보 처리 정지 요청</li>
        </ul>
        <p className="mb-6">
          이러한 요청은 언제든지 크로몹스 고객센터를 통해 처리할 수 있습니다.
        </p>

        <h2 className="text-2xl font-semibold text-blue-300 mb-4">
          6. 개인정보 보호를 위한 기술적/관리적 대책
        </h2>
        <p className="mb-6">
          크로몹스는 이용자의 개인정보를 안전하게 관리하기 위해 다음과 같은
          조치를 취하고 있습니다.
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>
            개인정보의 암호화: 이용자의 중요한 정보는 암호화하여 저장 및
            관리됩니다.
          </li>
          <li>
            해킹 등에 대비한 대책: 크로몹스는 최신 보안 솔루션을 사용하여 해킹,
            악성 코드 방지, 데이터 유출 방지를 위한 기술적 대책을 마련하고
            있습니다.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-300 mb-4">
          7. 개인정보 처리방침의 변경
        </h2>
        <p className="mb-6">
          본 개인정보처리방침은 관련 법령 및 회사 정책에 따라 변경될 수
          있습니다. 변경 사항은 공지사항을 통해 사전 통지 후 적용됩니다.
        </p>
        <p>- 공고일자: 2024년 10월 13일</p>
        <p className="mb-6">- 시행일자: 2024년 10월 14일</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
