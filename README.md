# Chiarato — Pasticceria & Caffetteria

Sito statico responsive, senza framework né dipendenze runtime. Due pagine:
`index.html` (home) e `storia.html` (La nostra storia), che condividono `styles.css` e `script.js`.

## Avvio

```bash
cd pasticceria-chiarato
npm start
```

Apri [http://localhost:4173](http://localhost:4173).

`serve.py` è `http.server` con `Cache-Control: no-store`: dopo ogni modifica a CSS/JS
basta ricaricare, niente più versioni vecchie servite dalla cache del browser.

## Asset

- `assets/logo-chiarato.svg`: wordmark crema, per i fondi scuri (sezione contatti).
  `assets/logo-chiarato-dark.svg`: stesso file col `fill` marrone, per l'header su fondo crema.
  Rigenerarlo dopo ogni modifica al wordmark:
  `sed 's/fill="#fffdf8"/fill="#43301d"/g' assets/logo-chiarato.svg > assets/logo-chiarato-dark.svg`
- `assets/photos/foto-*.jpg`: le 7 foto reali, ridimensionate a 1400px. Tutte dentro cornici a
  proporzione fissa (`.frame-square` 1:1, `.frame-portrait` 4:5), con didascalia in sovrimpressione.
- `assets/photos/hero-bg.jpg`: sfondo dell'hero, **830×680** da `pastry-powdered-full.png`
  (banda y 330–1010, larghezza fino a x 830). Oltre x≈830 inizia il bancone d'acciaio, che corre
  lungo tutto il lato destro per i due terzi superiori della foto: è il limite fisico del ritaglio.
- `assets/photos/cake-teddy-red.png`, `cake-bears-blue.png`, `cake-sushi.png`, `cake-stitch-pink.png`:
  ritagli su fondo trasparente nel carosello di `#prenota`. Sono i quattro soggetti che nelle
  `foto-*.jpg` non compaiono (`cake-stitch-pink` arriva da `archive-legacy/low-confidence-cutouts/`).
- `assets/photos/hero-croissant.png`, gli altri `cake-*.png`, i `*-full.png`: non caricati dalla
  pagina. I `*-full.png` sono i doppioni non ridimensionati delle `foto-*.jpg`; `cake-heart`,
  `cake-olive-roses`, `cake-red-log` e `cake-wedding-flowers` sono ritagli di foto già in uso;
  `cake-tv.png` è un ritaglio riuscito male. In tutto ≈15 MB inutilizzati.
- `assets/design/`: SVG originali usati come riferimenti di design.
- `assets/archive-legacy/`: asset del mockup iniziale.

## Foto per sezione

| Pagina | Sezione | Foto |
| --- | --- | --- |
| home | Hero (sfondo) | `hero-bg.jpg` |
| home | Mondo 01 / 02 / 03 | `foto-bigne.jpg` · `foto-torta-cuore.jpg` · `foto-torta-fiori.jpg` |
| home | Carosello `#prenota` | 8 torte: 4 ritagli + 4 foto |
| home | Galleria | `foto-tronchetto.jpg` · `foto-macarons.jpg` |
| home | Social (OG) | `og-chiarato.jpg`, ritaglio 1200×630 di `foto-torta-cuore.jpg` |
| storia | Banner + tre blocchi | `foto-forno.jpg` · `foto-bigne.jpg` · `foto-macarons.jpg` · `foto-torta-rose-ulivo.jpg` |

Le icone (telefono, WhatsApp, Facebook) sono uno sprite `<symbol>` in cima al `<body>`, richiamato
con `<use>`: un solo blocco, nessuna richiesta di rete. Glifi ufficiali da
[Simple Icons](https://simpleicons.org) (CC0) e [Lucide](https://lucide.dev) (ISC).

## Il tetto di risoluzione

`hero-bg.jpg` è **830×680**: 0,47× su telefono, 1,14× a 946px, 1,73× a 1440px.

Con `object-fit: cover` lo zoom apparente vale `larghezza_hero / larghezza_file`. Il file non può
superare gli 830px senza far entrare il bancone, quindi **su questa foto lo zoom è già al minimo
possibile**: l'unica leva rimasta è l'altezza dell'hero, alzata a `min(720px, 84vh)` per far
entrare più file di bomboloni in scena.

Provate e scartate come alternative: `pastry-almond-full` (colombe) inquadra solo 3 pezzi, quindi
è più ravvicinata, non meno; `macarons-color-full` ne mostra di più ma i colori litigano con la
palette crema/marrone.

Il vincolo è la foto, non il codice: l'originale è largo 1170px e il bancone ne occupa gli ultimi
370. Con l'originale ad alta risoluzione dal telefono (3000–4000px) si taglierebbe via il bancone
restando comunque sopra la larghezza di qualsiasi schermo.

Serve la foto originale dal telefono di chi l'ha scattata (in genere 3000–4000px). Vale per lo
sfondo dell'hero e per qualsiasi altra immagine a tutta pagina che verrà aggiunta.

## Scorrimento orizzontale: la trappola di `1fr`

Nelle regole responsive le griglie che si impilano usano `minmax(0, 1fr)` e **non** `1fr` secco.
Con `1fr` il minimo della colonna è `min-content`, e un figlio rigido — il carosello con otto
schede — allarga la colonna oltre il viewport: a 390px la pagina risultava larga 646px e scorreva
in orizzontale. Verifica rapida, caricando la pagina in un iframe stretto:
`document.documentElement.scrollWidth` deve essere uguale a `clientWidth`.

## Soglie responsive

| Larghezza | Cosa cambia |
| --- | --- |
| > 1080 | pieno desktop: 4 numeri, 3 prodotti, galleria a 3 colonne, 4 recensioni |
| 860–1080 | numeri più stretti, recensioni e galleria a 2, foto galleria quadrate, blocco prenota a piena riga |
| 760–860 | si impilano hero, contatti e le coppie di `storia.html` |
| < 760 | menù a panino, tutto a una colonna |

L'hero e i contatti restano a due colonne fino a **860px** e non a 1080: fra i due valori c'è la
finestra di browser tipica su portatile (~950px), dove impilare fa sembrare il sito un telefono
allargato.

## Foto da Tripadvisor e Facebook: cosa si può e cosa no

**Tripadvisor: no.** Le foto sulla scheda sono di chi le ha caricate, non del locale. Riusarle sul
sito commerciale della pasticceria è violazione di copyright, e le condizioni del servizio vietano
comunque di estrarne i contenuti.

**Facebook: sì come contenuto, no come fonte tecnica.** Le foto che la pasticceria ha pubblicato
sulla propria pagina sono sue, quindi può usarle sul proprio sito. Ma non si scaricano da fuori:
una richiesta non autenticata a `facebook.com/p/Pasticceria-Chiarato-…` risponde **HTTP 400**, senza
una sola immagine nella risposta. Servirebbe il login del titolare, oppure un token della Graph API
generato da chi amministra la pagina.

E anche riuscendoci non risolverebbe il punto sopra: Facebook ricomprime gli upload e serve al
massimo ~2048px, spesso molto meno. Per foto ad alta risoluzione la strada resta una sola, gli
originali dal titolare.

`foto-bigne.jpg` sono **bomboloni**, non bignè: il nome del file resta per non rompere i
riferimenti, l'`alt` e i testi in pagina sono stati corretti.

## SEO

`index.html` contiene canonical, Open Graph (`assets/og-chiarato.jpg`, 1200×630) e JSON-LD
`Bakery` + `CafeOrCoffeeShop` con indirizzo, telefono e orari.

Il dominio è un segnaposto: `https://www.pasticceriachiarato.it` compare 5 volte nella `<head>`
e va sostituito con quello reale prima di pubblicare.

La mappa nella sezione contatti è l'embed classico di Google Maps
(`google.com/maps?q=…&output=embed`): nessuna chiave API, un solo `iframe` con `loading="lazy"`.
La query è testuale e non a coordinate perché solo così Maps mostra il posto con il suo nome.
Coordinate del posto (`45.7852039, 12.2183561`) nel campo `geo` del JSON-LD.

L'iframe carica risorse di Google e ne segue i cookie: se il sito adotterà un banner di consenso,
la mappa va tra gli elementi da bloccare prima dell'accettazione.

Identificativi Google del posto, se un domani servisse l'Embed API o le Business Profile API:
place_id `ChIJtwlK47Q-eUcR26gECduTRE8`, short link `https://maps.app.goo.gl/WX4MvK1TDrcEwWLZ6`.

Il link WhatsApp è `https://wa.me/393282325012`, la forma stabile. I link `wa.me` che Google
propone con `?partnertoken=…` portano un JWT di attribuzione valido **5 minuti**: va tolto,
altrimenti arriva già scaduto al visitatore.

Il JSON-LD **non** include `aggregateRating` né le recensioni: Google vieta di marcare voti e
testi copiati da altre piattaforme (Google, Tripadvisor). Si potranno aggiungere solo per
recensioni raccolte direttamente dalla pasticceria.

Icone generate con `sips` da `assets/favicon.svg`; per rigenerare il PNG:

```bash
sed 's/ rx="13"//' assets/favicon.svg > /tmp/touch.svg
sips -s format png -Z 180 /tmp/touch.svg --out assets/apple-touch-icon.png
```

## Da verificare prima della pubblicazione

Dati presi da fonti pubbliche (Google, Tripadvisor, aggregatori), da confermare con il titolare:

- indirizzo, telefono e orari in `index.html` (sezione `#contatti` e barra in alto);
- valutazione «4,5 / 5» e «270+ recensioni» nella fascia `.credentials`;
- testo delle quattro recensioni in `#recensioni` (Tripadvisor blocca lo scraping diretto: i
  testi provengono da aggregatori, vanno ricontrollati sulla scheda ufficiale);
- anno di apertura, se si vuole reinserire in pagina.

I font sono caricati da Google Fonts e richiedono una connessione internet.
