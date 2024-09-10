export default function Features() {
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">ChromOps &apos; Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="역전"
            description="불리한 상황을 이겨내는 것은 당신의 본능입니다."
          />
          <FeatureCard
            title="승리"
            description="모든 싸움은 명예로운 승리로 끝날 것입니다."
          />
          <FeatureCard
            title="크로몹스의 사명"
            description="당신이 가진 용기와 사명을 패션으로 표현합니다"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
