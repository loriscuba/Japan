/* Configurazione del cruscotto.
   Queste chiavi finiscono comunque nel browser di chi apre la pagina: non sono segreti,
   ma vanno limitate.

   googleMapsKey: chiave Google Cloud con "Maps JavaScript API" e "Places API (New)" attive,
     limitata con una restrizione "Referrer HTTP" al dominio del sito
     (es. https://loriscuba.github.io/*).
   supabaseUrl / supabaseAnonKey: progetto Supabase dove gira supabase/schema.sql.
     La chiave "anon" (publishable) è pensata per stare nel browser: la tabella è chiusa
     e si legge/scrive solo tramite le funzioni che richiedono il codice del viaggio.

   I valori si possono anche inserire dalla pagina (scheda "Prima di partire" → Salvataggio):
   in quel caso restano solo sul dispositivo. */
window.JP26_CONFIG = {
  googleMapsKey: "",
  supabaseUrl: "",
  supabaseAnonKey: ""
};
