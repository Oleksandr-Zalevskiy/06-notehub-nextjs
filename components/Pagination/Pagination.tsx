import ReactPaginate from 'react-paginate';

interface PaginationProps {
  total: number;
  current: number;
  onChange: (selected: number) => void;
}

const Pagination = ({ total, current, onChange }: PaginationProps) => (
  <ReactPaginate
    pageCount={total}
    forcePage={current}
    onPageChange={({ selected }) => onChange(selected)}
  />
);
Ф;
