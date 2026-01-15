import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SubmitButton } from './SubmitButton';

import classes from './page.module.css';

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const error = params?.error;
  async function handleLogin(formData) {
    'use server';

    const username = formData.get('username');
    const password = formData.get('password');

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const cookieStore = await cookies();
      cookieStore.set('admin_session', 'true', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 8,
        path: '/',
      });

      redirect('/admin');
    } else {
      redirect('/login?error=1');
    }
  }

  return (
    <main className={classes['page']}>
      <form className={classes['login-form']} action={handleLogin}>
        <fieldset>
          <legend>כניסה לממשק ניהול</legend>
          <input name="username" type="text" placeholder="שם" required />
          <input name="password" type="password" placeholder="סיסמה" required />
          <SubmitButton />
          {error && <p className='error'>פרטים שגויים - נסו שוב.</p>}
        </fieldset>
      </form>
    </main>
  );
}