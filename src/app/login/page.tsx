"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-1/3">
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    </div>
  );
}
