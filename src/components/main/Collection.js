import Image from "next/image";

export default function Collection() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          당신을 위한 전술적 선택
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Repeat this block for each product */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <Image
              src="/product-1.jpg"
              alt="Tactical Jacket"
              width={400}
              height={300}
              layout="responsive"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">전술 재킷</h3>
              <p className="mb-4">내구성과 기능성을 갖춘 혁신적인 디자인</p>
              <button className="bg-yellow-500 text-black px-4 py-2 rounded font-bold hover:bg-yellow-600 transition duration-300">
                자세히 보기
              </button>
            </div>
          </div>
          {/* End of product block */}
        </div>
      </div>
    </section>
  );
}
