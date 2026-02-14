import Link from 'next/link';
import css from './Home.module.css';

export default function HomePage() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>Welcome to NoteHub</h1>
      <p className={css.description}>Your personal space for organized thoughts.</p>
      <Link href="/notes" className={css.button}>
        View My Notes
      </Link>
    </main>
  );
}
