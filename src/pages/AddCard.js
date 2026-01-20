import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";
import { addCard } from "../services/api";

export default function AddCard() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(cardData) {
    try {
      setBusy(true);
      setError(null);
      await addCard(cardData);
      navigate("/cards");
    } catch (err) {
      setError("Failed to add card");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <h1>Add New Card</h1>

      {error && <p>{error}</p>}
      {busy && <p>Saving...</p>}

      <CardForm
        onSubmit={handleSubmit}
        disabled={busy}
      />
    </main>
  );
}
