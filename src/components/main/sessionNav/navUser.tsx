"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";

//nav중 세션의 영향을 받는 User 컴포넌트

export default function NavUser() {
  const { data: session, status } = useSession(); //세션 정보를 가져옴

  if (status === "loading") {
    return <span className="loading loading-spinner loading-sm"></span>;
  }

  return (
    <li>
      {session ? (
        <div className="dropdown dropdown-hover dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn text-lg p-1 text-white bg-black border-0 hover:bg-transparent hover:text-yellow-500"
          >
            <FaUser />
          </div>
          <ul className="menu dropdown-content bg-base-100 rounded-sm z-[1] w-32 p-2 shadow text-zinc-800 text-md">
            <li>
              <Link href="/mypage" className="hover:bg-zinc-200">
                마이페이지
              </Link>
            </li>
            <li>
              <button onClick={() => signOut()} className="hover:bg-zinc-200">
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <Link href="/login" className="text-lg hover:text-yellow-500">
          <FaUser />
        </Link>
      )}
    </li>
  );
}
