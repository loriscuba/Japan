# Giappone 2026 — cruscotto del viaggio

Cruscotto del viaggio di nozze (19–30 ottobre 2026): percorso, giorno per giorno, treni, attrazioni e checklist.
È una pagina statica (`index.html` + `config.js`), pubblicata con GitHub Pages.

## Cosa si salva

- **Sempre, sul dispositivo:** piano delle attrazioni, spunte della checklist, ritmo, età di Umberto, cambio, note giornaliere.
- **Sul cloud (Supabase), se configurato:** gli stessi dati, condivisi fra tutti i telefoni che usano lo stesso *codice viaggio*.
  Sincronizza da solo a ogni modifica, quando riapri la pagina e ogni minuto.
- **Backup:** scheda *Prima di partire → Salvataggio* → *Scarica backup* / *Carica backup* (file JSON).

## Attivazione

1. **GitHub Pages:** *Settings → Pages → Source: GitHub Actions*. Ogni push su `main` pubblica il sito
   (su repository privati GitHub Pages richiede un piano a pagamento).
2. **Supabase (salvataggio condiviso):** in un progetto Supabase apri *SQL Editor* ed esegui `supabase/schema.sql`.
   Poi copia *Project URL* e la chiave *anon / publishable* in `config.js`.
   La tabella è chiusa: si legge e scrive solo con le due funzioni che richiedono il codice viaggio.
3. **Google Maps (dati live nelle schede: orari, valutazioni, foto, mappa):** in Google Cloud Console abilita
   *Maps JavaScript API* e *Places API (New)*, crea una chiave API con restrizione *Referrer HTTP*
   sul dominio del sito (es. `https://loriscuba.github.io/*`) e mettila in `config.js`.
4. Apri il sito, vai su *Prima di partire → Salvataggio e Google Maps*, premi *Genera un codice* e *Salva e sincronizza*.
   Inserisci lo stesso codice sul telefono di Michela.

Le chiavi si possono anche incollare direttamente nella pagina (sezione *Chiavi tecniche*): restano solo su quel dispositivo.

## Google My Maps

Nella scheda *Percorso e mappa* ci sono i pulsanti per scaricare il CSV dei luoghi (tutti o solo il piano),
da importare in [Google My Maps](https://mymaps.google.com).
