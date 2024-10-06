import React from "react";

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethod,
  setPaymentMethod,
}) => {
  return (
    <div className="bg-gray-100 p-6 rounded-sm mb-6">
      <h2 className="text-xl font-semibold mb-4">결제 방식</h2>
      <div className="flex gap-3">
        <button
          onClick={() => setPaymentMethod("EASY_PAY")}
          className={`btn hover:bg-[#f9e000] ${
            paymentMethod === "EASY_PAY"
              ? "bg-[#f9e000] border-2 border-black"
              : "bg-gray-200"
          }`}
        >
          카카오Pay결제
        </button>
        <button
          onClick={() => setPaymentMethod("CARD")}
          className={`btn hover:bg-blue-900 ${
            paymentMethod === "CARD"
              ? "bg-blue-900 text-white border-2 border-black"
              : "bg-gray-200"
          }`}
        >
          한국결제네트웍스
        </button>
      </div>
    </div>
  );
};
