import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import AppShell from "../components/AppShell";
import { formatDate, normalizeList } from "../utils/formatters";
import styles from "./Deals.module.css";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadDeals = async () => {
      try {
        const [dealsResponse, analyticsResponse] = await Promise.all([
          apiClient.get("/api/v1/deals/"),
          apiClient.get("/api/v1/deals/analytics/me/").catch(() => null),
        ]);

        if (mounted) {
          setDeals(normalizeList(dealsResponse.data));
          setAnalytics(analyticsResponse?.data || null);
        }
      } catch (err) {
        console.error("Deals load failed:", err);
        if (mounted) setError("Could not load your deals.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadDeals();

    return () => {
      mounted = false;
    };
  }, []);

  const updateDeal = async (dealId, action) => {
    setError("");

    try {
      await apiClient.post(`/api/v1/deals/${dealId}/${action}/`, {});
      setDeals((current) =>
        current.map((deal) =>
          deal.id === dealId ? { ...deal, status: action.toUpperCase() } : deal,
        ),
      );
    } catch (err) {
      console.error("Deal update failed:", err);
      setError(`Could not ${action} this deal.`);
    }
  };

  return (
    <AppShell>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>Exchange desk</p>
        <h1 className={styles.detailTitle}>Deals</h1>
        <p className={styles.detailDescription}>
          Track proposed exchanges and respond to the ones waiting on you.
        </p>
        {analytics && (
          <p className={styles.notice}>
            Analytics loaded for this account. Open deals:{" "}
            {analytics.open_deals ?? analytics.total ?? deals.length}
          </p>
        )}
      </section>

      <h2 className={styles.sectionTitle}>Your deals</h2>
      {error && <p className={styles.error}>{error}</p>}
      {loading && <p className={styles.empty}>Loading deals...</p>}
      {!loading && !deals.length && (
        <p className={styles.empty}>No deals yet. Publish an offer to begin.</p>
      )}

      <div className={styles.grid}>
        {deals.map((deal) => (
          <article key={deal.id} className={styles.dealCard}>
            <div className={styles.cardTop}>
              <span className={styles.pill}>{deal.status}</span>
              <span className={styles.muted}>{formatDate(deal.created_at)}</span>
            </div>
            <div className={styles.dealPair}>
              <div className={styles.dealOffer}>
                <strong>{deal.initiator_offer?.title || "Initiator offer"}</strong>
                <p className={styles.muted}>{deal.initiator}</p>
              </div>
              <span className={styles.muted}>for</span>
              <div className={styles.dealOffer}>
                <strong>{deal.responder_offer?.title || "Responder offer"}</strong>
                <p className={styles.muted}>{deal.responder}</p>
              </div>
            </div>
            {deal.status === "PROPOSED" && (
              <div className={styles.rowActions}>
                <button
                  className={styles.primaryButton}
                  onClick={() => updateDeal(deal.id, "accept")}
                >
                  Accept
                </button>
                <button
                  className={styles.secondaryButton}
                  onClick={() => updateDeal(deal.id, "reject")}
                >
                  Reject
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </AppShell>
  );
};

export default Deals;
