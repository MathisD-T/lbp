


1. Install dependencies:
   `npm install`
2. Backend (local SQLite + Express) env keys :
   - Crée un fichier `.env` à la racine avec `ADMIN_TOKEN=ton-mot-de-passe` et éventuellement `PORT=4000`.
   - Dans `.env.local` (front) : `VITE_API_URL` (ex: `http://localhost:4000`) et `VITE_ADMIN_TOKEN` (le même que `ADMIN_TOKEN`).
   - Formsubmit (contact) : `VITE_FORMSUBMIT_EMAIL` (adresse destinataire)
   - (Optionnel) EmailJS (estimate) : `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID_ESTIMATE`, `VITE_EMAILJS_PUBLIC_KEY`
3. Lancer le backend : `npm run server` (écoute sur `PORT` ou `http://localhost:4000`, DB dans `data/db.sqlite`).
4. Configure EmailJS avec deux templates (estimate/contact) si tu veux envoyer des mails.
5. Run the app:
   `npm run dev`

## Assets

Place les images globales du site (logo, icônes…) dans `public/assets` pour qu'elles soient servies via `/assets/...`.
