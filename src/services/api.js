/**
 * API Service (Create React App)
 *
 * 1) Create `.env` at project root
 * 2) Set: REACT_APP_API_URL=https://YOUR-BACKEND.onrender.com
 * 3) Restart `npm start`
 */
const API_URL = process.env.REACT_APP_API_URL || "";

/**
 * TODO: If your backend routes differ, update the paths here.
 * Required endpoints:
 * - GET    /allcards
 * - POST   /addcard
 * - PUT    /updatecard/:id
 * - DELETE /deletecard/:id
 */

export async function getCards() {
	// GET /allcards (provided as reference)
	const res = await fetch(`${API_URL}/allcards`);
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json();
}

export async function addCard({ card_name, card_pic }) {
	// TODO: implement POST /addcard
	const res = await fetch(`${API_URL}/addcard`, {
		method: "POST",
		body: JSON.stringify({ card_name, card_pic }),
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json();
}

export async function updateCard({ id, card_name, card_pic }) {
	// TODO: implement PUT /updatecard/:id
	const res = await fetch(`${API_URL}/updatecard/${id}`, {
		method: "PUT",
		body: JSON.stringify({ card_name, card_pic }),
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json();
}

export async function deleteCard(id) {
	// TODO: implement DELETE /deletecard/:id
	const res = await fetch(`${API_URL}/deletecard/${id}`, {
		method: "DELETE",
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json();
}
