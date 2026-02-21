import css from './Home.module.css';

export default function Loading() {
  return (
    <div className={css.loaderContainer}>
      <div className={css.spinner}></div>
      <p>Loading NoteHub...</p>
    </div>
  );
}
