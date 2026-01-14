
import classes from './footer.module.css';

export default function Footer() {

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer className={classes.footer}>
      כל הזכויות שמורות ללחם הדסה © {currentYear}
    </footer>
  )
}