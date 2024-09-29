import { auth } from "@/auth";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  // 이미 로그인한 사용자는 홈페이지로 리다이렉트
  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}
