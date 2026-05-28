import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../app/authContext";
import styles from "./Auth.module.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ phone_number: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(formData);
    setLoading(false);

    if (result.success) {
      navigate(location.state?.from || "/");
      return;
    }

    setError(result.error);
  };

  return (
    <main className={styles.page}>
      <section className={styles.modal}>
        <header className={styles.header}>
          <h1 className={styles.title}>Log in</h1>
          <Link className={styles.close} to="/" aria-label="Close">
            <img className={styles.closeIcon} src="/icons/x.svg" alt="" />
          </Link>
        </header>
        <div className={styles.body}>
          <aside className={styles.visual}>
            <div className={styles.avatar}>
              <span className={styles.plus}>+</span>
            </div>
            <h2 className={styles.visualTitle}>Welcome Back</h2>
            <p className={styles.visualText}>Trade smarter with RBT</p>
            <Link className={styles.imageButton} to="/register">
              Add Account
            </Link>
          </aside>
          <form className={styles.form} onSubmit={handleSubmit}>
            {error && <p className={styles.error}>{error}</p>}
            <label className={styles.label}>
              <span className={styles.labelText}>
                Phone number <span className={styles.hint}>?</span>
              </span>
              <input
                className={styles.input}
                name="phone_number"
                value={formData.phone_number}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    phone_number: event.target.value,
                  }))
                }
                required
              />
            </label>
            <label className={styles.label}>
              <span className={styles.labelText}>
                Password <span className={styles.hint}>?</span>
              </span>
              <input
                className={styles.input}
                name="password"
                type="password"
                value={formData.password}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                required
              />
            </label>
            <button className={styles.submit} disabled={loading}>
              {loading ? "Logging in..." : "Save"}
            </button>
            <Link className={styles.switch} to="/register">
              No account? <strong>Register</strong>
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
