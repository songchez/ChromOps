import React from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export default async function Account() {
  const session = await auth();
  if (!session || !session.user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">계정관리</h1>
      <div className="mb-4">
        <p>
          <strong>이름:</strong> {session.user.name}
        </p>
        <p>
          <strong>이메일:</strong> {session.user.email}
        </p>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        비밀번호 변경
      </button>
    </div>
  );
}
