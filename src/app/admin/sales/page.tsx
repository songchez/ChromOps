"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SalesData {
  id: string;
  productName: string;
  quantity: number;
  totalSales: number;
}

async function getSalesData(): Promise<SalesData[]> {
  const response = await fetch("/api/admin/sales");
  if (!response.ok) {
    throw new Error("판매 데이터를 가져오는 데 실패했습니다.");
  }
  return response.json();
}

export default function AdminSalesPage() {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session || !session.user.isAdmin) {
      router.push("/login");
      return;
    }

    const fetchSalesData = async () => {
      try {
        const data = await getSalesData();
        setSalesData(data);
      } catch (err) {
        setError("판매 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalesData();
  }, [session, status, router]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div>
      <h1>관리자 판매 페이지</h1>
      <SalesDataDisplay data={salesData} />
    </div>
  );
}

function SalesDataDisplay({ data }: { data: SalesData[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>제품명</th>
          <th>판매 수량</th>
          <th>총 판매액</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.productName}</td>
            <td>{item.quantity}</td>
            <td>{item.totalSales.toLocaleString()}원</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
