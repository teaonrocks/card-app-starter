export default function CardForm({
  values,
  onChange,
  onSubmit,
  busy,
  error,
  submitText,
}) {
  /* TODO: Complete the CardForm component 
  - display form inputs for card_name and card_pic
  - display error message
  - display submit button 
  - handle form submission 
  - style as a form UI */
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
  <form onSubmit={handleSubmit} className="card-form">
    <div className="form-group">
      <label>Card Name</label>
      <input
        type="text"
        id="card_name"
        name="card_name"
        value={values.card_name || ""}
        onChange={(e) => onChange({ ...values, card_name: e.target.value })}
        disabled={busy}
        required
      />
    </div>
    <div className="form-group">
      <label>Card Picture:</label>
      <input
        type="text"
        id="card_pic"
        name="card_pic"
        value={values.card_pic || ""}
        onChange={(e) => onChange({ ...values, card_pic: e.target.value })}
        disabled={busy}
        required
      />
    </div>

    {error && <p className="error">{error}</p>}

    <button type="submit" disabled={busy}>
      {busy ? "Saving..." : submitText}
    </button>
  </form>

  );
}
