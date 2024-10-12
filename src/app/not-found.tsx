import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex justify-center bg-white">
      <div className="text-center m-5">
        <Image
          src="/images/404.jpg"
          alt="404 Not Found"
          width={320}
          height={320}
        ></Image>
        <p className="text-lg text-gray-500 mt-2">
          해당페이지가 존재하지 않아요
        </p>
        <Link href="/" className="btn bg-blue-700 text-white rounded-md mt-6">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
