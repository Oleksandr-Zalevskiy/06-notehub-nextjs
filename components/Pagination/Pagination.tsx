'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  total: number; 
  current: number; /
  onChange: (selected: number) => void;
}

const Pagination = ({ total, current, onChange }: PaginationProps) => {
  return (
    <div className={css.paginationContainer}>
      <ReactPaginate
        pageCount={total}
        forcePage={current}
        onPageChange={({ selected }) => onChange(selected)}
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        containerClassName={css.pagination}
        activeClassName={css.active}
        pageClassName={css.pageItem}
        previousClassName={css.prevItem}
        nextClassName={css.nextItem}
      />
    </div>
  );
};

export default Pagination;
