import localFont from 'next/font/local';
import Image from 'next/image';
import classes from './signature.module.css';

const googleSansBold = localFont({
  src: './GoogleSans-Bold.ttf',
  weight: '700',
  style: 'normal',
  variable: '--font-google-sans-bold',
});

export default function Signature() {

  return (
    <a
      className={`${classes['signature']} ${googleSansBold.className}`}
      href="https://riser.co.il"
      rel="sponsored"
      target="_blank"
    >
      <span className={classes['by-label']}>חוויה מאת</span>
      <Image
        src="/logo-icon.svg"
        width={15}
        height={15}
        alt="לוגו רייזר - חוויות אינטראקטיביות מרגשות"
      />
      <span className={classes['logo-label']}>רייזר</span>
    </a>
  )
}