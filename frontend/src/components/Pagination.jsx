import { useEffect, useState } from "react";

export default function Pagination({
  page,
  totalPages,
  onPrev,
  onNext,
  onSelectPage,
}) {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const generatePageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;

      let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    };

    setPageNumbers(generatePageNumbers());
  }, [page, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className={`px-4 py-2 rounded-md border text-sm font-medium ${
          page === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
        }`}
      >
        ‹ Previous
      </button>

      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => onSelectPage(1)}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              page === 1
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            } border`}
          >
            1
          </button>
          {pageNumbers[0] > 2 && (
            <span className="px-2 text-gray-500">...</span>
          )}
        </>
      )}

      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onSelectPage(pageNum)}
          className={`px-3 py-2 rounded-md text-sm font-medium border ${
            page === pageNum
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          {pageNum}
        </button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="px-2 text-gray-500">...</span>
          )}
          <button
            onClick={() => onSelectPage(totalPages)}
            className={`px-3 py-2 rounded-md text-sm font-medium border ${
              page === totalPages
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className={`px-4 py-2 rounded-md border text-sm font-medium ${
          page === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
        }`}
      >
        Next ›
      </button>

      {/* Page Info */}
      <div className="ml-4 text-sm text-gray-600">
        Page {page} of {totalPages}
      </div>
    </div>
  );
}
