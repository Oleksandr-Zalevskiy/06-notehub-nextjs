'use client';

import css from './Pagination.module.css';

interface PaginationProps {
  total: number;
  current: number;
  onChange: (page: number) => void;
}

const Pagination = ({ total, current, onChange }: PaginationProps) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className={css.pagination}>
      {pages.map(page => (
        <button
          key={page}
          className={page === current ? css.active : css.button}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
