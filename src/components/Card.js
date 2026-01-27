import { Link } from "react-router-dom";

export default function Card({ card, onDelete, busy }) {
	if (!card) return null;

	const title = card.card_name || card.title || "Untitled";
	const imageSrc = card.card_pic || card.image || card.image_url || "";

	return (
		<article className="card">
			<div className="card-media">
				{imageSrc ? (
					<img src={imageSrc} alt={title} />
				) : (
					<div className="card-placeholder">No image</div>
				)}
			</div>
			<div className="card-body">
				<h3 className="card-title">{title}</h3>
				<p className="card-id">ID: {card.id}</p>
				<div className="card-actions">
					<Link to={`/cards/edit/${card.id}`} className="btn">
						Edit
					</Link>
					<button
						type="button"
						className="btn btn-danger"
						onClick={() => onDelete?.(card)}
						disabled={busy}
					>
						{busy ? "Deleting..." : "Delete"}
					</button>
				</div>
			</div>
		</article>
	);
}
