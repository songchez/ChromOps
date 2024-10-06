"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroText() {
  return (
    <div className="relative text-left -inset-x-40">
      <motion.h1
        className="text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        역사를 뒤집고 승리를 쟁취하라
      </motion.h1>
      <motion.p
        className="text-xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        패션은 단순한 옷이 아니라, 승리의 전략입니다.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Link
          href="/shop"
          className="bg-zinc-300 text-black px-8 py-3 rounded-sm font-bold hover:bg-yellow-600 transition duration-300"
        >
          둘러보기
        </Link>
      </motion.div>
    </div>
  );
}
