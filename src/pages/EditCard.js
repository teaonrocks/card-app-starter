import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardForm from "../components/CardForm";
import { getCards, updateCard } from "../services/api";

export default function EditCard() {
  /* TODO: Complete the EditCard page
    - display a form for editing a card (use the CardForm component to display the form)
    - handle form submission to call updateCard API
    - handle loading, busy, and error states
    - style as a form UI */
    

    const { id } = useParams();
    const navigate = useNavigate();

    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    useEffect(() => {
      async function fetchCard() {
        try {
          const cards = await getCards();
          setCard(data);
        } catch (err) {
          setError("Failed to load card");
        } finally {
          setLoading(false);
        }
      }

      fetchCard();
    }, [id]);

    async function handleSubmit(updatedCard) {
      try {
        setBusy(true);
        await updateCard(id, updatedCard);
        navigate("/cards");
      } catch (err) {
        setError("Failed to update card");
      } finally {
        setBusy(false);
      }
    }

    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>{error}</p>;
    }

  return (
    <div className="container">
      <h2>Edit Card</h2>

      <CardForm 
      initialData={card} 
      onSubmit={handleSubmit} 
      busy={busy} />
    </div>
  );
}
