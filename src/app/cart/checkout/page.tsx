"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import * as PortOne from "@portone/browser-sdk/v2";
import Script from "next/script";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Address {
  address: string;
  zonecode: string;
}

declare global {
  interface Window {
    daum: any;
  }
}

const CheckoutPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState<Address>({
    address: "",
    zonecode: "",
  });
  const [detailAddress, setDetailAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("KAKAOPAY");
  const [recipient, setRecipient] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const cartData = localStorage.getItem("cartItems");
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
  }, []);

  const getOrderName = (items: CartItem[]): string => {
    if (items.length === 0) return "주문 없음";
    if (items.length === 1) return items[0].name;
    return `${items[0].name} 외 ${items.length - 1}개`;
  };

  const getTotalAmount = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: Address) {
        setAddress({ address: data.address, zonecode: data.zonecode });
      },
    }).open();
  };

  const handlePayment = async () => {
    if (status !== "authenticated" || !session?.user) {
      console.error("사용자가 인증되지 않았습니다.");
      return;
    }

    setIsLoading(true);
    try {
      const orderName = getOrderName(cartItems);
      const totalAmount = getTotalAmount(cartItems);

      const paymentDataResponse = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderName,
          totalAmount,
          cartItems,
          address: { ...address, detailAddress },
          paymentMethod,
        }),
      });

      if (!paymentDataResponse.ok) {
        throw new Error("결제 초기화 실패");
      }

      const paymentData = await paymentDataResponse.json();

      const response = await PortOne.requestPayment(paymentData);

      if (response.code != null) {
        console.error("결제 오류:", response.message);
        router.push("/cart/checkout/fail");
      } else {
        console.log("결제 성공:", response);
        const notified = await fetch("/api/payment/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentId: response.paymentId,
            userId: session.user.id,
            orderId: paymentData.orderId,
          }),
        });

        if (notified.ok) {
          localStorage.removeItem("cartItems");
          router.push("/cart/checkout/success");
        } else {
          console.error("서버 알림 실패");
          router.push("/cart/checkout/fail");
        }
      }
    } catch (error) {
      console.error("결제 요청 실패:", error);
      router.push("/cart/checkout/fail");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
      <div className="container mx-auto p-4 max-w-4xl bg-white text-gray-800">
        <h1 className="text-xl font-bold mb-6 text-center">결제 페이지</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col">
            <div className="bg-gray-100 p-6 rounded-sm mb-6 flex-grow">
              <h2 className="text-xl font-semibold mb-4">배송 정보</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="받는 사람"
                  className="input input-bordered w-full rounded-sm mb-2"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="전화번호"
                  className="input input-bordered w-full rounded-sm mb-2"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="주소"
                    className="input input-bordered flex-grow rounded-sm"
                    value={address.address}
                    readOnly
                  />
                  <button
                    onClick={handleAddressSearch}
                    className="btn bg-blue-700 text-white rounded-sm"
                  >
                    주소 검색
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="우편번호"
                  className="input input-bordered w-full rounded-sm mb-2"
                  value={address.zonecode}
                  readOnly
                />
                <input
                  type="text"
                  placeholder="상세주소"
                  className="input input-bordered w-full rounded-sm mb-2"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                />
                <textarea
                  placeholder="배송시 유의사항"
                  className="textarea textarea-bordered w-full rounded-sm"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                ></textarea>
              </div>
            </div>
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
          </div>
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
                          {(item.price * item.quantity).toLocaleString("ko-KR")}
                          원
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
                disabled={
                  isLoading ||
                  cartItems.length === 0 ||
                  !address.address ||
                  !detailAddress ||
                  !recipient ||
                  !phoneNumber
                }
                className={`btn bg-blue-700 text-white w-full rounded-sm ${
                  isLoading ? "loading" : ""
                }`}
              >
                {isLoading ? "처리 중..." : "결제하기"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
