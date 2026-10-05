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
2. **Supabase (salvataggio condiviso):** progetto *Demo IPA*, schema `japan` (già creato con `supabase/schema.sql`).
   In *Project Settings → Data API → Exposed schemas* deve esserci `japan`.
   La tabella è chiusa: si legge e scrive solo con le due funzioni che richiedono il codice viaggio.
3. **Google Maps (dati live nelle schede: orari, valutazioni, foto, mappa):** in Google Cloud Console abilita
   *Maps JavaScript API* e *Places API (New)*, crea una chiave API con restrizione *Referrer HTTP*
   sul dominio del sito (es. `https://loriscuba.github.io/*`) e mettila in `config.js`.
4. Apri il sito, vai su *Prima di partire → Salvataggio e Google Maps*, premi *Genera un codice* e *Salva e sincronizza*.
   Inserisci lo stesso codice sul telefono di Michela.

Le chiavi stanno solo in `config.js`: per cambiarle si modifica quel file.

## Google Maps nel cruscotto

- **Percorso e mappa:** mappa Google interattiva con le tratte del viaggio e i segnaposto (piano, preferiti di Michela, hotel, altri luoghi).
  Toccando un segnaposto si apre la scheda, da cui si aggiunge il luogo al piano. Resta disponibile la mappa schematica.
- **Giorno per giorno:** per ogni giornata, il pulsante *Giro del giorno su Google Maps* apre il percorso con i luoghi scelti.
- **Schede dei luoghi:** orari, valutazioni, foto e mini-mappa da Google Places.

## Programma della giornata

Sotto ogni giorno c'è un programma con orari e spostamenti, dalla partenza (hotel o arrivo) al rientro, compresi i trasporti fissi
(bus per Okuhida, bus da Shirakawa-go, treno per Kyoto, trasferimento a Osaka).

- **Aggiungi luogo:** ricerca su Google Maps (Places), con tipo, durata, orari di apertura e posizione compilati da soli;
  il luogo va nel punto del giorno dove allunga meno il giro.
- **Modifiche:** orario (scriverlo lo fissa), durata, ordine, spostamento a un altro giorno, rimozione.
- **Spostamenti:** a piedi, mezzi pubblici o taxi con tempi e costo stimati, più il link al percorso su Google Maps.
- **Riorganizza giorno:** prova tutti gli ordini possibili (euristica 2-opt oltre le 8 tappe) e sceglie quello che riduce gli spostamenti
  rispettando orari fissati, trasporti fissi, orari di apertura da Google e il momento migliore di ogni luogo (alba, pranzo, tramonto, cena).
  Avvisa se la giornata non ci sta e suggerisce cosa togliere.

Programmi e luoghi aggiunti si sincronizzano con il cloud come il resto.

## Preferiti di Michela

I 20 luoghi in Giappone salvati sul suo Google Maps sono nel cruscotto: hotel e stazione dei bus erano già presenti,
gli altri 15 sono nei giorni giusti con un consiglio (sì / forse / da saltare). Riepilogo nella scheda *Attrazioni*.

## Google My Maps

Nella scheda *Percorso e mappa* ci sono i pulsanti per scaricare il CSV dei luoghi (tutti o solo il piano),
da importare in [Google My Maps](https://mymaps.google.com).
