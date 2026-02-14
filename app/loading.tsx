import css from './Home.module.css'; // Можна використовувати стилі з Home або створити окремі

export default function Loading() {
  return (
    <div className={css.loaderContainer}>
      <div className={css.spinner}></div>
      <p>Loading NoteHub...</p>
    </div>
  );
}
