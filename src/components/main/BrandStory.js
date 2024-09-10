import Image from "next/image";

export default function BrandStory() {
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Operation Chromite에서 영감을 받다
        </h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/operation-chromite.jpg"
              alt="Operation Chromite"
              width={500}
              height={300}
              layout="responsive"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <p className="mb-4">
              인천상륙작전(Operation Chromite)의 대담한 전략과 승리의 순간에서
              영감을 받아 탄생한 크로몹스. 우리는 역사의 한 페이지를 현대적인
              패션으로 재해석합니다.
            </p>
            <p>
              크로몹스의 모든 제품에는 역전과 승리의 정신이 깃들어 있습니다.
              당신의 일상이 곧 전장입니다. 당신의 승리를 위해 크로몹스가
              함께합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
