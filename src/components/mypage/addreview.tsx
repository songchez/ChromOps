"use client";
import { Product } from "@prisma/client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";

export default function AddReview({ product }: { product: Product }) {
  const [review, setReview] = useState({
    comment: "",
    rating: 0,
    reviewImage: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleReviewSubmit = async () => {
    const formData = new FormData();
    formData.append("productId", product.id);
    formData.append("productName", product.slug);
    formData.append("rating", review.rating.toString());
    formData.append("comment", review.comment);

    if (imageFile) {
      formData.append("imageFile", imageFile);
    }
    try {
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      const response = await fetch("/api/reviews", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("리뷰 작성에 실패했습니다.");

      const modal = document.getElementById(
        "success_modal"
      ) as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }

      setReview({ comment: "", rating: 0, reviewImage: "" });
      setImageFile(null);
    } catch (error) {
      console.error("리뷰 작성 중 오류 발생:", error);
      const modal = document.getElementById("fail_modal") as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
    }
  };

  return (
    <div>
      <div>
        <div className="flex space-x-1 m-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`text-2xl ${
                review.rating >= star ? "text-yellow-400" : "text-gray-400"
              }`}
              onClick={() => setReview({ ...review, rating: star })}
            >
              <FaStar />
            </button>
          ))}
        </div>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="고객님의 솔직하고 소중한 리뷰는 저희의 원동력입니다"
          value={review.comment}
          onChange={(e) => setReview({ ...review, comment: e.target.value })}
        />

        <input
          type="file"
          className="file-input file-input-bordered w-full mt-2"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) setImageFile(e.target.files[0]);
          }}
        />
        <div className="flex justify-end w-full">
          <button
            className="btn bg-blue-700 text-white mt-4 w-full rounded-md"
            onClick={handleReviewSubmit}
          >
            제출
          </button>
        </div>
      </div>
      <dialog id="success_modal" className="modal">
        <div className="modal-box">
          <p className="py-4">리뷰가 성공적으로 작성되었습니다.</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="fail_modal" className="modal">
        <div className="modal-box">
          <p className="py-4">리뷰 작성에 실패했습니다.</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
