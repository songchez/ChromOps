import Link from "next/link";

const PaymentSuccessPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">결제 완료</h1>
      <p className="mb-4">결제가 성공적으로 완료되었습니다.</p>
      <Link href="/">
        <a className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          홈으로 돌아가기
        </a>
      </Link>
    </div>
  );
};

export default PaymentSuccessPage;
