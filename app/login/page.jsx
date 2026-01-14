import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SubmitButton } from './SubmitButton';

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
      // Set a simple cookie that expires in 24 hours
      const cookieStore = await cookies();
      cookieStore.set('admin_session', 'true', {
        httpOnly: true,     // Prevents JavaScript from reading the cookie (Protects against XSS)
        secure: true,       // Ensures cookie is only sent over HTTPS (Vercel/Production standard)
        sameSite: 'lax',    // Protects against CSRF attacks
        maxAge: 60 * 60 * 8, // Session lasts 8 hours
        path: '/',          // Available across the entire site
      });

      redirect('/admin');
    } else {
      redirect('/login?error=1');
    }
  }

  return (
    <main style={{ maxWidth: '400px', margin: '100px auto', fontFamily: 'sans-serif' }}>
      <h1>Admin Login</h1>
      {error && <p style={{ color: 'red' }}>Invalid credentials. Please try again.</p>}

      <form action={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input name="username" type="text" placeholder="Username" required style={{ padding: '8px' }} />
        <input name="password" type="password" placeholder="Password" required style={{ padding: '8px' }} />
        <SubmitButton />
      </form>
    </main>
  );
}