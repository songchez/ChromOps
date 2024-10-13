export default function SkeletonLoading() {
  return (
    <div className="p-4">
      <div className="skeleton h-8 w-48 mb-4"></div>
      <ul className="space-y-4">
        {[1, 2, 3].map((i) => (
          <li key={i} className="border p-4 rounded-lg shadow-md bg-white">
            <div className="skeleton h-6 w-32 mb-2"></div>
            <div className="skeleton h-4 w-24 mb-4"></div>
            <ul className="mt-2">
              {[1, 2].map((j) => (
                <li
                  key={j}
                  className="flex items-start space-x-4 border-b py-2"
                >
                  <div className="skeleton w-24 h-24 rounded"></div>
                  <div className="flex-1">
                    <div className="skeleton h-4 w-3/4 mb-2"></div>
                    <div className="skeleton h-4 w-1/2"></div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-4">
              <div className="skeleton h-6 w-32"></div>
              <div className="skeleton h-10 w-24"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
