import ReactPaginate from 'react-paginate';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './Pagination.module.css';

interface Props {
  totalPages: number;
}

export default function Pagination({ totalPages }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (event: { selected: number }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(event.selected + 1));
    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={handlePageChange}
      containerClassName={styles.pagination}
      pageClassName={styles.pageItem}
      pageLinkClassName={styles.pageLink}
      activeClassName={styles.active}
      previousClassName={styles.pageItem}
      nextClassName={styles.pageItem}
      previousLinkClassName={styles.pageLink}
      nextLinkClassName={styles.pageLink}
      disabledClassName={styles.disabled}
      previousLabel="Previous"
      nextLabel="Next"
    />
  );
}
