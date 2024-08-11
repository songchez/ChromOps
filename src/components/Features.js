// components/Features.js
export default function Features() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Unique Products</h2>
        <p className="mt-2">
          Discover a curated selection of retro-inspired products.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Fast Shipping</h2>
        <p className="mt-2">
          Get your products delivered quickly with our fast shipping options.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Quality Guarantee</h2>
        <p className="mt-2">
          We guarantee the quality of every product we sell.
        </p>
      </div>
    </section>
  );
}
