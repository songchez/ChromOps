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
      <select
        className="select select-bordered w-full rounded-sm"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="KAKAOPAY">카카오페이</option>
        <option value="CARD">카드결제</option>
      </select>
    </div>
  );
};
