import { useEffect, useState } from "react";
import Card from "../components/Card";
import { deleteCard, getCards } from "../services/api";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await getCards();
      setCards(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load cards.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(card) {
    const ok = window.confirm(`Delete "${card.card_name}"?`);
    if (!ok) return;

    setBusy(true);
    setError("");
    try {
      const res = await deleteCard(card.id);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // Optimistic update:
      setCards((prev) => prev.filter((c) => c.id !== card.id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete card.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="page">
      <div className="page__header">
        <h2 className="page__title">All Cards</h2>
        <button className="btn btn--ghost" onClick={load} disabled={busy}>
          Refresh
        </button>
      </div>

      {error ? <div className="alert alert--error">{error}</div> : null}

      {loading ? (
        <div className="muted">Loading…</div>
      ) : cards.length === 0 ? (
        <div className="muted">No cards yet. Add your first card!</div>
      ) : (
        <div className="grid">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onDelete={handleDelete}
              disabled={busy}
            />
          ))}
        </div>
      )}
    </section>
  );
}
