import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../app/authContext";
import styles from "./Shell.module.css";

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.topbarInner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandMark}>R</span>
          RBT
        </Link>

        <nav className={styles.nav}>
          <NavLink to="/" className={styles.navLink}>
            Offers
          </NavLink>
          {user ? (
            <>
              <NavLink to="/offers/new" className={styles.navLink}>
                New offer
              </NavLink>
              <NavLink to="/my-offers" className={styles.navLink}>
                My offers
              </NavLink>
              <NavLink to="/deals" className={styles.navLink}>
                Deals
              </NavLink>
              <button className={styles.ghostButton} onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={styles.navLink}>
                Log in
              </NavLink>
              <NavLink to="/register" className={styles.primaryButton}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Topbar;
