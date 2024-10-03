import React from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  getTotalAmount: (items: CartItem[]) => number;
  handlePayment: () => void;
  isLoading: boolean;
  isDisabled: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  getTotalAmount,
  handlePayment,
  isLoading,
  isDisabled,
}) => {
  return (
    <div className="flex-1">
      <div className="bg-gray-100 p-6 rounded-sm">
        <h2 className="text-xl font-semibold mb-4">주문 내역</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-left">상품명</th>
                <th className="text-right">수량</th>
                <th className="text-right">가격</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="text-left">{item.name}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">
                    {(item.price * item.quantity).toLocaleString("ko-KR")}원
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="divider"></div>
        <div className="text-right pb-4">
          <p className="text-xl font-bold">
            총 금액: {getTotalAmount(cartItems).toLocaleString("ko-KR")}원
          </p>
        </div>
        <button
          onClick={handlePayment}
          disabled={isDisabled}
          className={`btn bg-blue-700 text-white w-full rounded-sm ${
            isLoading ? "loading" : ""
          }`}
        >
          {isLoading ? "처리 중..." : "결제하기"}
        </button>
      </div>
    </div>
  );
};
