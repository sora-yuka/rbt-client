import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import AppShell from "../components/AppShell";
import { ownOffersService } from "../services/ownOffersService";
import styles from "./NewOffer.module.css";

const categories = [
  { id: 1, name: "electronics" },
  { id: 2, name: "clothings" },
  { id: 3, name: "books" },
];

const NewOffer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "1",
    desired_offer: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await apiClient.post("/api/v1/offers/", {
        ...formData,
        category: Number(formData.category),
      });
      ownOffersService.addId(response.data.id);
      navigate(`/offers/${response.data.id || ""}`);
    } catch (err) {
      console.error("Offer create failed:", err);
      setError(err.response?.data?.detail || "Could not create this offer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>New exchange</p>
        <h1 className={styles.detailTitle}>Create offer</h1>
        <p className={styles.detailDescription}>
          Describe the item you have and what kind of exchange would make sense.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          <label className={styles.label}>
            Title
            <input
              className={styles.input}
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={150}
              required
            />
          </label>
          <label className={styles.label}>
            Category
            <select
              className={styles.select}
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.label}>
            Description
            <textarea
              className={styles.textarea}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.label}>
            Desired exchange
            <textarea
              className={styles.textarea}
              name="desired_offer"
              value={formData.desired_offer}
              onChange={handleChange}
            />
          </label>
          <div className={styles.formFooter}>
            <button className={styles.primaryButton} disabled={loading}>
              {loading ? "Publishing..." : "Publish offer"}
            </button>
          </div>
        </form>
      </section>
    </AppShell>
  );
};

export default NewOffer;
