import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
  return (
    <>
      <div className={styles.accentBar} />
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            <svg
              className={styles.logoIcon}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="16,1 29,8.5 29,23.5 16,31 3,23.5 3,8.5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <polygon
                points="16,6 25,11 25,21 16,26 7,21 7,11"
                fill="var(--accent-primary)"
                opacity="0.3"
              />
            </svg>
            CLASH<span className={styles.logoBold}>BOARD</span>
          </Link>

          <nav className={styles.nav}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
              }
            >
              Standings
            </NavLink>
            <NavLink
              to="/players"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
              }
            >
              Players
            </NavLink>
            <NavLink
              to="/matches"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
              }
            >
              Matches
            </NavLink>
          </nav>

          <Link to="/admin" className={styles.seasonBadge}>
            Admin
          </Link>
          <span className={styles.seasonBadge}>Season 1</span>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        ClashBoard &copy; {new Date().getFullYear()}
      </footer>
    </>
  );
}
