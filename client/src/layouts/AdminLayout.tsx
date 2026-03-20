import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "./AdminLayout.module.css";

export default function AdminLayout() {
  return (
    <>
      <div className={styles.accentBar} />
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/admin" className={styles.logo}>
            CLASH<span className={styles.logoBold}>BOARD</span>
            <span className={styles.adminBadge}>Admin</span>
          </Link>

          <Link to="/" className={styles.backLink}>
            &larr; Back to site
          </Link>
        </div>
      </header>

      <div className={styles.wrapper}>
        <nav className={styles.sidebar}>
          <span className={styles.sidebarLabel}>Manage</span>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ""}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/leagues"
            className={({ isActive }) =>
              `${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ""}`
            }
          >
            Leagues
          </NavLink>
          <NavLink
            to="/admin/players"
            className={({ isActive }) =>
              `${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ""}`
            }
          >
            Players
          </NavLink>
          <NavLink
            to="/admin/matches"
            className={({ isActive }) =>
              `${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ""}`
            }
          >
            Matches
          </NavLink>
        </nav>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </>
  );
}
