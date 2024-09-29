import Link from "next/link";

const PaymentFailPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">결제 실패</h1>
      <p className="mb-4">결제 중 문제가 발생했습니다. 다시 시도해 주세요.</p>
      <Link href="/cart/checkout">
        <a className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          결제 페이지로 돌아가기
        </a>
      </Link>
    </div>
  );
};

export default PaymentFailPage;
