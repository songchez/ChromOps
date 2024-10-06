"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroText() {
  return (
    <div className="relative text-left w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-0">
      <div className="lg:absolute lg:left-8 lg:top-1/2 lg:-translate-y-1/2">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-4 text-white shadow-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          역사를 뒤집고 승리를 쟁취하라
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl mb-8 text-white shadow-text"
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
            className="bg-zinc-300 text-black px-8 py-3 rounded-sm font-bold hover:bg-yellow-600 transition duration-300 inline-block"
          >
            둘러보기
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
