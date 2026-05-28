import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AppShell from "../components/AppShell";
import apiClient from "../services/apiClient";
import { ownOffersService } from "../services/ownOffersService";
import {
  formatDate,
  getCategoryName,
  getOfferImage,
  normalizeList,
} from "../utils/formatters";
import styles from "./MyOffers.module.css";

const MyOffers = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const barterFor = searchParams.get("barterFor");
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creatingDealId, setCreatingDealId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadOffers = async () => {
      try {
        const response = await apiClient.get("/api/v1/offers/");
        if (mounted) setOffers(normalizeList(response.data));
      } catch (err) {
        console.error("Own offers load failed:", err);
        if (mounted) setError("Could not load your offers.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadOffers();

    return () => {
      mounted = false;
    };
  }, []);

  const ownOffers = useMemo(() => {
    const ids = ownOffersService.getIds();
    return offers.filter((offer) => ids.includes(Number(offer.id)));
  }, [offers]);

  const handleBarter = async (offerId) => {
    if (!barterFor) return;
    setError("");
    setNotice("");
    setCreatingDealId(offerId);

    try {
      await apiClient.post("/api/v1/deals/", {
        initiator_offer: Number(offerId),
        responder_offer: Number(barterFor),
      });
      setNotice("Deal proposed. You can track it from the deals page.");
      navigate("/deals");
    } catch (err) {
      console.error("Deal create failed:", err);
      setError(err.response?.data?.detail || "Could not propose this barter.");
    } finally {
      setCreatingDealId(null);
    }
  };

  return (
    <AppShell>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>
          {barterFor ? "Choose your side of the trade" : "Personal inventory"}
        </p>
        <h1 className={styles.title}>My offers</h1>
        <p className={styles.description}>
          {barterFor
            ? "Select one of your published offers to barter for the item you opened."
            : "These are the offers you created in this browser session."}
        </p>
        {notice && <p className={styles.notice}>{notice}</p>}
        <div className={styles.rowActions}>
          <Link className={styles.primaryButton} to="/offers/new">
            Create offer
          </Link>
          <Link className={styles.secondaryButton} to="/">
            Browse all offers
          </Link>
        </div>
      </section>

      <h2 className={styles.sectionTitle}>Published by you</h2>
      {error && <p className={styles.error}>{error}</p>}
      {loading && <p className={styles.empty}>Loading offers...</p>}
      {!loading && !ownOffers.length && (
        <p className={styles.empty}>
          No own offers yet. Create an offer first, then come back to barter.
        </p>
      )}

      <div className={styles.grid}>
        {ownOffers.map((offer) => (
          <article
            key={offer.id}
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
                <span className={styles.pill}>{getCategoryName(offer)}</span>
              </div>
              <div className={styles.cardFooter}>
                <span>{offer.owner}</span>
                <span>{formatDate(offer.created_at)}</span>
              </div>
              <div className={styles.rowActions}>
                {barterFor ? (
                  <button
                    className={styles.reserveButton}
                    disabled={creatingDealId === offer.id}
                    onClick={() => handleBarter(offer.id)}
                  >
                    {creatingDealId === offer.id ? "Proposing..." : "Use to barter"}
                  </button>
                ) : (
                  <Link className={styles.reserveButton} to={`/offers/${offer.id}`}>
                    Open
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
};

export default MyOffers;
