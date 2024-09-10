export default function Footer() {
  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">ChromOps</h3>
          <p>당신의 승리를 위한 전술적 파트너</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-yellow-500">
            Instagram
          </a>
          <a href="#" className="hover:text-yellow-500">
            Facebook
          </a>
          <a href="#" className="hover:text-yellow-500">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
