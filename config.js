/* Configurazione del cruscotto.
   Queste chiavi finiscono comunque nel browser di chi apre la pagina: non sono segreti,
   ma vanno limitate.

   googleMapsKey: chiave Google Cloud con "Maps JavaScript API", "Places API (New)" e "Routes API" attive,
     limitata con una restrizione "Referrer HTTP" al dominio del sito
     (es. https://loriscuba.github.io/*).
   supabaseUrl / supabaseAnonKey: progetto Supabase dove gira supabase/schema.sql.
     La chiave publishable è pensata per stare nel browser: la tabella è chiusa
     e si legge/scrive solo tramite le funzioni che richiedono il codice del viaggio.
   supabaseSchema: schema Postgres (va aggiunto agli "Exposed schemas" della Data API).
   Il codice dei dati nel database è la password del sito: si inserisce una volta per dispositivo e non sta qui. */
window.JP26_CONFIG = {
  googleMapsKey: "AIzaSyDEcVce0Rb3nVQb58T1KGEwnqmYdgwHuvQ",
  supabaseUrl: "https://exchjppslwhbnbzuhfqs.supabase.co",
  supabaseAnonKey: "sb_publishable_SxSgB8SFGXBxN2HzQBQfFA_ppbgB_ZT",
  supabaseSchema: "japan"
};
