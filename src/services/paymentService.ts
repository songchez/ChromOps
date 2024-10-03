// 결제 초기화 함수
export const initiatePayment = async (orderData: any) => {
  const response = await fetch("/api/payment/initiate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error("결제 초기화 실패");
  }

  return response.json();
};

// 결제 완료 처리 함수
export const completePayment = async (paymentId: string, orderId: string) => {
  const response = await fetch("/api/payment/complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paymentId, orderId }),
  });

  if (!response.ok) {
    throw new Error("결제 완료 처리 실패");
  }

  return response.json();
};
