import Link from 'next/link';
import classes from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={classes['page-content']}>
      <h1>הדף לא נמצא</h1>
      <Link href="/">לדף הראשי</Link>
    </main>
  );
}