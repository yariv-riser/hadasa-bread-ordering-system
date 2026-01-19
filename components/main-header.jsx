'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/admin/actions'

import classes from './main-header.module.css';

export default function MainHeader() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <header className={classes.header}>

      {isAdminRoute && (
        <nav className={classes['header-nav']}>
          <Link className={`${pathname === '/admin' ? 'active' : ''}`} href="/admin">מוצרים</Link>
          <Link className={`${pathname === '/admin/orders' ? 'active' : ''}`} href="/admin/orders ">הזמנות</Link>
        </nav>
      )}

      <div className={classes['logo-container']}>
        <Link href="/">
          <Image
            className={classes.logo}
            loading="eager"
            src="https://pub-a541fcb4769b4b0782b51f2b72d105e9.r2.dev/images/hadasa-bread-logo.png"
            alt="Logo"
            fill
          />
        </Link>
      </div>

      {isAdminRoute && (
        <button
          className={classes['logout-btn']}
          onClick={logout}
        >
          יציאה
        </button>
      )}

    </header>
  )
}