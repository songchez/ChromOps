import Image from "next/image";

export default function BrandStory() {
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <Image
              src="/images/operation-chromite.png"
              alt="OPERATION CHROMITE"
              width={500}
              height={500}
            />
          </div>
          <div className="md:w-1/3 md:pl-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              OPERATION CHROMITE
            </h2>
            <p className="mb-4">
              인천상륙작전(Operation Chromite)의 대담한 전략과 승리의 순간에서
              영감을 받아 탄생한 크로몹스(ChromOps). 우리는 역사의 한 페이지를
              현대적인 패션으로 재해석합니다.
            </p>
            <p>
              크로몹스의 모든 제품에는 역전과 승리의 정신이 깃들어 있습니다.
              당신의 전쟁같은 일상 속에서 당신의 역전과 승리를 위해 크로몹스가
              함께합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
