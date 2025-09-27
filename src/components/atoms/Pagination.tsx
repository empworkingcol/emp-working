import React from 'react';

const Pagination = ({ currentPage, maxPage, onPageChange }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < maxPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='flex items-center space-x-4'>
      <button
        onClick={handlePrevClick}
        className='px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50'
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span className='text-lg font-semibold'>{currentPage}</span>
      <button
        onClick={handleNextClick}
        className='px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50'
        disabled={currentPage === maxPage}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
