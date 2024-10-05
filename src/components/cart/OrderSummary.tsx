import React from "react";
import Link from "next/link";

interface OrderSummaryProps {
  orderSummary: {
    subtotal: number;
    discount: number;
    shippingEstimate: number;
    orderTotal: number;
  };
}

export default function OrderSummary({ orderSummary }: OrderSummaryProps) {
  return (
    <div className="w-full md:w-1/3">
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">주문예상금액</h2>
        <div className="space-y-2">
          <SummaryItem label="총 상품 가격" value={orderSummary.subtotal} />
          <SummaryItem label="총 할인" value={-orderSummary.discount} />
          <SummaryItem
            label="총 배송비"
            value={orderSummary.shippingEstimate}
          />
          <div className="flex justify-end font-semibold text-lg pt-2">
            <span>{orderSummary.orderTotal.toLocaleString("ko-KR")}원</span>
          </div>
        </div>
        <Link
          href="/cart/checkout"
          className="btn w-full bg-blue-800 text-white py-2 rounded mt-4 hover:bg-indigo-500 transition duration-200"
        >
          결제하기
        </Link>
      </div>
    </div>
  );
}

interface SummaryItemProps {
  label: string;
  value: number;
}

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <span>{value.toLocaleString("ko-KR")}원</span>
    </div>
  );
}
