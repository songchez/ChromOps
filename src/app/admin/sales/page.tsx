"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SalesData {
  id: string;
  productName: string;
  quantity: number;
  totalSales: number;
}

export default function AdminSalesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSalesData();
  }, [session, status, router]);

  const fetchSalesData = async () => {
    try {
      const response = await fetch("/api/admin/sales");
      if (!response.ok) {
        throw new Error("Failed to fetch sales data");
      }
      const data = await response.json();
      setSalesData(data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-zinc-950">
      <h1 className="text-2xl font-bold mb-6">관리자 판매 페이지</h1>
      <SalesDataDisplay data={salesData} />
    </div>
  );
}

function SalesDataDisplay({ data }: { data: SalesData[] }) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2">제품명</th>
          <th className="border border-gray-300 p-2">판매 수량</th>
          <th className="border border-gray-300 p-2">총 판매액</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="border border-gray-300 p-2">{item.productName}</td>
            <td className="border border-gray-300 p-2">{item.quantity}</td>
            <td className="border border-gray-300 p-2">
              {item.totalSales.toLocaleString()}원
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
