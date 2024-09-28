"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";

//nav중 세션의 영향을 받는 User 컴포넌트

export default function NavUser() {
  const { data: session } = useSession(); //세션 정보를 가져옴

  return (
    <li>
      {session ? (
        <div className="flex items-center space-x-4">
          <Link href="/mypage" className="text-lg">
            <FaUser />
          </Link>
          <button onClick={() => signOut()}>로그아웃</button>
        </div>
      ) : (
        <Link href="/login" className="text-lg">
          <FaUser />
        </Link>
      )}
    </li>
  );
}
