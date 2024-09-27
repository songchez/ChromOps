"use client";

import { useState, useEffect } from "react";
import { prisma } from "@/lib/prisma";

interface SalesData {
  id: string;
  productName: string;
  quantity: number;
  totalSales: number;
}

export default function SalesStatus() {
  const [salesData, setSalesData] = useState<SalesData[]>([]);

  useEffect(() => {
    async function fetchSalesData() {
      try {
        const response = await fetch("/api/sales");
        if (response.ok) {
          const data = await response.json();
          setSalesData(data);
        } else {
          console.error("판매 데이터 가져오기 실패");
        }
      } catch (error) {
        console.error("판매 데이터 가져오는 중 오류 발생:", error);
      }
    }

    fetchSalesData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">판매 현황</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">상품명</th>
            <th className="py-2 px-4 border-b">판매 수량</th>
            <th className="py-2 px-4 border-b">총 판매액</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.productName}</td>
              <td className="py-2 px-4 border-b text-center">
                {item.quantity}
              </td>
              <td className="py-2 px-4 border-b text-right">
                {item.totalSales.toLocaleString()}원
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
