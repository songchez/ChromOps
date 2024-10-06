import React from "react";

interface ShippingFormProps {
  recipient: string;
  setRecipient: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  address: { address: string; zonecode: string };
  detailAddress: string;
  setDetailAddress: (value: string) => void;
  handleAddressSearch: () => void;
  deliveryNote: string;
  setDeliveryNote: (value: string) => void;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
  recipient,
  setRecipient,
  phoneNumber,
  setPhoneNumber,
  address,
  detailAddress,
  setDetailAddress,
  handleAddressSearch,
  deliveryNote,
  setDeliveryNote,
}) => {
  return (
    <div className="bg-gray-100 p-6 rounded-sm mb-6 flex-grow">
      <h2 className="text-xl font-semibold mb-4">배송 정보</h2>
      {/* 받는 사람 입력 필드 */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="받는 사람"
          className="input input-bordered w-full rounded-sm mb-2"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        {/* 전화번호 입력 필드 */}
        <input
          type="tel"
          placeholder="휴대폰 번호 (예: 01012345678)"
          className="input input-bordered w-full rounded-sm mb-2"
          value={phoneNumber}
          onChange={(e) => {
            const input = e.target.value.replace(/\D/g, "");
            const formattedNumber = input.replace(
              /(\d{3})(\d{4})(\d{4})/,
              "$1-$2-$3"
            );
            setPhoneNumber(formattedNumber);
          }}
        />
      </div>
      {/* 주소 입력 섹션 */}
      <h3 className="text-md font-semibold mb-2">주소</h3>
      <div className="mb-4">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="주소"
            className="input input-bordered flex-grow rounded-sm"
            value={address.address}
            readOnly
            disabled
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
          disabled
        />
        <input
          type="text"
          placeholder="상세주소"
          className="input input-bordered w-full rounded-sm mb-2"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
        />
      </div>
      {/* 배송 메모 입력 필드 */}
      <h3 className="text-md font-semibold mb-2">배송시 유의사항</h3>
      <div className="mb-4">
        <textarea
          placeholder="배송시 유의사항"
          className="textarea textarea-bordered w-full rounded-sm"
          value={deliveryNote}
          onChange={(e) => setDeliveryNote(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};
