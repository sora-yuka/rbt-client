import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../services/apiClient";
import heroImage from "../assets/exchange.jpg";
import {
  formatDate,
  getCategoryName,
  getOfferImage,
  normalizeList,
} from "../utils/formatters";
import AppShell from "../components/AppShell";
import styles from "./Home.module.css";

const Home = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    let mounted = true;

    const loadOffers = async () => {
      try {
        const response = await apiClient.get("/api/v1/offers/");
        if (mounted) setOffers(normalizeList(response.data));
      } catch (err) {
        console.error("Offers load failed:", err);
        if (mounted) setError("Could not load offers from the backend.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadOffers();

    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const names = offers.map(getCategoryName).filter(Boolean);
    return ["all", ...Array.from(new Set(names))];
  }, [offers]);

  const filteredOffers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return offers.filter((offer) => {
      const matchesCategory =
        category === "all" || getCategoryName(offer) === category;
      const haystack = [
        offer.title,
        offer.description,
        offer.owner,
        offer.desired_offer,
        getCategoryName(offer),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesCategory && haystack.includes(normalizedQuery);
    });
  }, [category, offers, query]);

  return (
    <AppShell>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Exchange marketplace</p>
          <h1 className={styles.heroTitle}>RBT</h1>
          <p className={styles.heroText}>
            Find useful things nearby and trade them for something better. Browse
            live offers, compare desired swaps, and start a deal when you are
            ready.
          </p>
          <div className={styles.heroActions}>
            <Link to="/offers/new" className={styles.primaryButton}>
              Create offer
            </Link>
            <a href="#offers" className={styles.secondaryButton}>
              Browse offers
            </a>
          </div>
        </div>
        <div className={styles.heroMedia}>
          <img src={heroImage} alt="Items prepared for exchange" />
        </div>
      </section>

      <section id="offers">
        <h2 className={styles.sectionTitle}>Available offers</h2>

        <div className={styles.toolbar}>
          <input
            className={styles.search}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, owner, desired item..."
          />
          <select
            className={styles.select}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((name) => (
              <option key={name} value={name}>
                {name === "all" ? "All categories" : name}
              </option>
            ))}
          </select>
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {loading && <p className={styles.empty}>Loading offers...</p>}

        {!loading && !filteredOffers.length && (
          <p className={styles.empty}>No offers match the current filters.</p>
        )}

        <div className={styles.grid}>
          {filteredOffers.map((offer) => (
            <Link
              key={offer.id}
              to={`/offers/${offer.id}`}
              className={styles.offerCard}
              style={{ backgroundImage: `url(${getOfferImage(offer)})` }}
            >
              <div className={styles.cardTop}>
                <span className={styles.dots}>•••</span>
                <span className={styles.status}>{offer.status}</span>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{offer.title}</h3>
                <p className={styles.cardDescription}>{offer.description}</p>
                <div className={styles.chips}>
                  <span className={styles.pill}>{getCategoryName(offer)}</span>
                </div>
                <div className={styles.cardFooter}>
                  <span>{offer.owner}</span>
                  <span>{formatDate(offer.created_at)}</span>
                </div>
                <span className={styles.reserveButton}>View offer</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
};

export default Home;
