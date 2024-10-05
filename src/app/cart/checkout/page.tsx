"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import * as PortOne from "@portone/browser-sdk/v2";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { PaymentMethodSelector } from "@/components/checkout/PaymentMethodSelector";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import Script from "next/script";

// 주소 타입 정의
interface Address {
  address: string;
  zonecode: string;
}

const CheckoutPage: React.FC = () => {
  // 상태 관리
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
  const [deliveryNote, setDeliveryNote] = useState("문앞에 놔주세요");

  const router = useRouter();
  const { data: session, status } = useSession();

  // 컴포넌트 마운트 시 장바구니 아이템 로드
  useEffect(() => {
    const cartData = localStorage.getItem("cartItems");
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
  }, []);

  // 주문명 생성 함수
  const getOrderName = (items: CartItem[]): string => {
    if (items.length === 0) return "주문 없음";
    if (items.length === 1) return items[0].name;
    return `${items[0].name} 외 ${items.length - 1}개`;
  };

  // 총 주문 금액 계산 함수
  const getTotalAmount = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // 주소 검색 핸들러
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: Address) {
        setAddress({ address: data.address, zonecode: data.zonecode });
      },
    }).open();
  };

  // 결제 처리 함수
  const handlePayment = async () => {
    if (status !== "authenticated" || !session?.user) {
      console.error("사용자가 인증되지 않았습니다.");
      return;
    }

    setIsLoading(true);
    try {
      const orderName = getOrderName(cartItems);
      const totalAmount = getTotalAmount(cartItems);

      const orderData = {
        orderName,
        totalAmount,
        cartItems,
        address: { ...address, detailAddress },
        paymentMethod,
        recipient,
        phoneNumber,
        deliveryNote,
      };

      // 결제 초기화 (서버 측 API 호출)
      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("결제 초기화 실패");
      }

      const { paymentData, orderId } = await response.json();

      // 포트원 결제 요청
      const portOneResponse = await PortOne.requestPayment(paymentData);

      if (portOneResponse.code != null) {
        console.error("결제 오류:", portOneResponse.message);
        router.push("/cart/checkout/fail");
      } else {
        console.log("결제 성공:", portOneResponse);
        // 결제 완료 처리 (서버 측 API 호출)
        const completeResponse = await fetch("/api/payment/complete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentId: portOneResponse.paymentId,
            orderId: orderId,
          }),
        });

        if (completeResponse.ok) {
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
    return <span className="loading loading-spinner loading-sm"></span>;
  }

  return (
    <>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />
      <div className="container mx-auto p-4 max-w-4xl bg-white text-gray-800">
        <h1 className="text-xl font-bold mb-6 text-center">Checkout</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col">
            <ShippingForm
              recipient={recipient}
              setRecipient={setRecipient}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              address={address}
              detailAddress={detailAddress}
              setDetailAddress={setDetailAddress}
              handleAddressSearch={handleAddressSearch}
              deliveryNote={deliveryNote}
              setDeliveryNote={setDeliveryNote}
            />
            <PaymentMethodSelector
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>
          <OrderSummary
            cartItems={cartItems}
            getTotalAmount={getTotalAmount}
            handlePayment={handlePayment}
            isLoading={isLoading}
            isDisabled={
              isLoading ||
              cartItems.length === 0 ||
              !address.address ||
              !detailAddress ||
              !recipient ||
              !phoneNumber
            }
          />
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
