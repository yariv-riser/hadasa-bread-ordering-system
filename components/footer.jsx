
import classes from './footer.module.css';
import Signature from './signature/signature';

export default function Footer() {

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer className={classes.footer}>
      <div>כל הזכויות שמורות ללחם הדסה © {currentYear}</div>
      <Signature />
    </footer>
  )
}