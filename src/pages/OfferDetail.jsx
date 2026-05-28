import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "../services/apiClient";
import AppShell from "../components/AppShell";
import { formatDate, getCategoryName } from "../utils/formatters";
import styles from "./OfferDetail.module.css";

const OfferDetail = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadOffer = async () => {
      try {
        const response = await apiClient.get(`/api/v1/offers/${id}/`);
        if (mounted) setOffer(response.data);
      } catch (err) {
        console.error("Offer load failed:", err);
        if (mounted) setError("This offer could not be loaded.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadOffer();

    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <AppShell>
      {loading && <p className={styles.empty}>Loading offer...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {offer && (
        <section className={styles.panel}>
          <div className={styles.detailTop}>
            <span className={styles.pill}>{getCategoryName(offer)}</span>
            <span className={styles.muted}>{offer.status}</span>
          </div>
          <h1 className={styles.detailTitle}>{offer.title}</h1>
          <p className={styles.detailDescription}>{offer.description}</p>
          {offer.desired_offer && (
            <div className={styles.swapBox}>
              <strong>Desired exchange:</strong> {offer.desired_offer}
            </div>
          )}
          <div className={styles.cardFooter}>
            <span>Offered by {offer.owner}</span>
            <span>{formatDate(offer.created_at)}</span>
          </div>
          <div className={styles.rowActions}>
            <Link
              className={styles.primaryButton}
              to={`/my-offers?barterFor=${offer.id}`}
            >
              Barter
            </Link>
            <Link className={styles.secondaryButton} to="/">
              Back to offers
            </Link>
          </div>
        </section>
      )}
    </AppShell>
  );
};

export default OfferDetail;
