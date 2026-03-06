import { Link, Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            Clash<span className={styles.logoAccent}>Board</span>
          </Link>
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>
              Standings
            </Link>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}
