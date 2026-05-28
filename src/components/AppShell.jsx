import Topbar from "./Topbar";
import styles from "./Shell.module.css";

const AppShell = ({ children }) => (
  <div className={styles.shell}>
    <Topbar />
    <main className={styles.main}>{children}</main>
  </div>
);

export default AppShell;
