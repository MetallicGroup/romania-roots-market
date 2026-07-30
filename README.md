# Roman Treasures Marketplace

Creează un website modern de tip marketplace pentru produse românești tradiționale (miere, dulcețuri, produse de la mici producători locali din România). Design curat, premium, cald — nu literal, ci inspirat din estetica satului românesc, dar cu un feel modern de ecommerce 2026.

Stil general

Paletă de culori: tonuri calde de miere/auriu (#D4A017, #E8B84A), verde natural închis (#2E4A2C sau similar), crem/bej pentru fundal (#FAF6EE), accent terracota pentru butoane secundare.

Font pentru titluri: un serif modern, cald (ex: Fraunces, Playfair Display sau similar) — dă senzația de tradiție + premium.

Font pentru body/UI: sans-serif curat (ex: Inter, Manrope) pentru lizibilitate.

Colțuri rotunjite consistent (rounded-2xl), umbre subtile, spațiere generoasă (whitespace), fără aglomerare.

Micro-animații la hover (scale ușor, shadow) pe carduri și butoane.

Mobile-first, complet responsive (design-ul de bază e gândit pentru mobil, ca un screenshot de telefon).

Header / Bară de sus

Sigla brandului în stânga (placeholder text logo, font serif).

În dreapta, un meniu compact cu 3-4 iconițe/butoane:

Categorii — buton cu dropdown/mega-menu (ex: Miere, Dulcețuri, Produse lactate, Conserve, Cadouri)

Cont — icon utilizator, click deschide login/signup

Produse salvate — icon inimă/wishlist, cu badge cu numărul de produse salvate

Coș — icon coș, cu badge cu numărul de produse din coș, click deschide un drawer lateral cu sumarul comenzii

Secțiunea Hero

Fundal: o hartă stilizată, modernă, vectorială a României (nu o captură satelit realistă) — gândește-te la un stil "line art" sau "flat illustration" cu contur subtil al țării, eventual cu mici iconițe/puncte marcând regiuni de unde vin producătorii (Transilvania, Moldova, Muntenia etc.), animate discret (fade-in sau puls ușor) la încărcarea paginii.

Colțul stânga-sus al hero-ului: un video embed mic (thumbnail cu buton de play, aspect ratio 16:9 sau pătrat, colțuri rotunjite, umbră) care prezintă brandul/producătorii. La click, thumbnail-ul se extinde într-un modal/lightbox video full-screen (cu fundal întunecat semi-transparent în spate și buton de close vizibil).

pe hero, în dreapta: o bară de căutare elegantă, lată, cu icon de lupă, colțuri complet rotunjite (pill-shape), placeholder "Caută produse", cu shadow subtil ca să iasă în evidență peste harta din fundal.

Secțiunea de produse

Sub bara de cautare, un grid de produse: 2 rânduri x 3 coloane (6 produse vizibile, cu buton "Vezi toate produsele" dedesubt).

Fiecare card de produs are:

Contur (border) subțire, colțuri ușor rotunjite (rounded-xl), fundal alb/crem, umbră foarte discretă

Imagine produs (placeholder) în partea de sus a cardului

Nume produs (ex: "Miere de salcâm", "Miere de tei", "Dulceață de afine")

Variantă/greutate (ex: 250g / 500g / 1kg) afișată ca mici tag-uri sau dropdown selectabil

Preț

Două butoane/acțiuni per card: "Adaugă în coș" (buton plin, culoare accent miere/auriu) și "Află mai multe" (buton outline sau link discret) care deschide pagina de detaliu a produsului

totul vreau sa se intample in hero, hero sa fie vertical da? cat ecranul telefonul deci harta sa fie cat tot hero verical

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://romania-roots-market.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2dd62680-d01c-433b-907b-60fbedb69fb9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
