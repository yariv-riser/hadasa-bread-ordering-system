
import Image from 'next/image';
import Link from 'next/link';
import classes from './main-header.module.css';

export default function MainHeader() {
  return (
    <header className={classes.header}>
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
    </header>
  )
}