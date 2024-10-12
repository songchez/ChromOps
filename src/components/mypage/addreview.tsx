"use client";
import { Product } from "@prisma/client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";

export default function AddReview({ product }: { product: Product }) {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [review, setReview] = useState({
    comment: "",
    rating: 0,
    reviewImage: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleReviewSubmit = async () => {
    if (!selectedOrderId) return;

    const formData = new FormData();
    formData.append("productId", product.id);
    formData.append("productName", product.name);
    formData.append("rating", review.rating.toString());
    formData.append("comment", review.comment);

    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
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
      setSelectedOrderId(null);
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
      {selectedOrderId && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl">리뷰 작성</h2>
          <textarea
            className="textarea textarea-bordered w-full mt-2"
            placeholder="리뷰를 작성하세요"
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
          />
          <div className="flex space-x-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`text-2xl ${
                  review.rating >= star ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => setReview({ ...review, rating: star })}
              >
                <FaStar />
              </button>
            ))}
          </div>
          <input
            type="file"
            className="file-input file-input-bordered w-full mt-2"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) setImageFile(e.target.files[0]);
            }}
          />
          <button className="btn btn-success mt-4" onClick={handleReviewSubmit}>
            제출
          </button>
        </div>
      )}
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
