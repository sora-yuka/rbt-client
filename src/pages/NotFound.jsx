import { Link } from "react-router-dom";
import AppShell from "../components/AppShell";
import styles from "./NotFound.module.css";

const NotFound = () => (
  <AppShell>
    <section className={styles.panel}>
      <p className={styles.eyebrow}>404</p>
      <h1 className={styles.detailTitle}>Page not found</h1>
      <p className={styles.detailDescription}>
        The page you requested is not available in this frontend.
      </p>
      <div className={styles.rowActions}>
        <Link className={styles.primaryButton} to="/">
          Back to offers
        </Link>
      </div>
    </section>
  </AppShell>
);

export default NotFound;
