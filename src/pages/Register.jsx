import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../services/apiClient";
import styles from "./Auth.module.css";

const Register = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("username", formData.username);
      payload.append("phone_number", formData.phoneNumber);
      payload.append("password", formData.password);

      if (profilePhoto) {
        payload.append("profile_photo", profilePhoto);
      }

      await apiClient.post("/api/v1/users/enroll/", payload);
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.detail || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be 2 MB or smaller.");
      event.target.value = "";
      return;
    }

    setError("");
    setProfilePhoto(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <main className={styles.page}>
      <section className={styles.modal}>
        <header className={styles.header}>
          <h1 className={styles.title}>Add User</h1>
          <Link className={styles.close} to="/" aria-label="Close">
            <img className={styles.closeIcon} src="/icons/x.svg" alt="" />
          </Link>
        </header>
        <div className={styles.body}>
          <aside className={styles.visual}>
            <div className={styles.avatar}>
              {imagePreview && (
                <img
                  className={styles.avatarImage}
                  src={imagePreview}
                  alt="Selected profile preview"
                />
              )}
              <span className={styles.plus}>+</span>
            </div>
            <h2 className={styles.visualTitle}>Upload Image</h2>
            <p className={styles.visualText}>Max File Size: 2mb</p>
            <button
              className={styles.imageButton}
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              Add Image
            </button>
            <input
              ref={fileInputRef}
              className={styles.fileInput}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </aside>
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          <label className={styles.label}>
            <span className={styles.labelText}>
              Username
            </span>
            <input
              className={styles.input}
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.label}>
            <span className={styles.labelText}>
              Phone number
            </span>
            <input
              className={styles.input}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.label}>
            <span className={styles.labelText}>
              Password
            </span>
            <input
              className={styles.input}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button className={styles.submit} disabled={loading}>
            {loading ? "Creating..." : "Save"}
          </button>
          <Link className={styles.switch} to="/login">
            Already registered? <strong>Log in</strong>
          </Link>
        </form>
        </div>
      </section>
    </main>
  );
};

export default Register;
