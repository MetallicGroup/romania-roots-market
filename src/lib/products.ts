import mierSalcam from "@/assets/products/miere-salcam.jpg";
import mierTei from "@/assets/products/miere-tei.jpg";
import dulceataAfine from "@/assets/products/dulceata-afine.jpg";
import mierPoliflora from "@/assets/products/miere-poliflora.jpg";
import dulceataTrandafiri from "@/assets/products/dulceata-trandafiri.jpg";
import zacusca from "@/assets/products/zacusca.jpg";
import branzaBurduf from "@/assets/products/branza-burduf.jpg";
import fainaPorumb from "@/assets/products/faina-porumb.jpg";
import gogosari from "@/assets/products/gogosari.jpg";

export type Product = {
  id: string;
  name: string;
  region: string;
  category: string;
  weights: string[];
  price: number;
  image: string;
  swatch: string;
  producer: string;
  description: string;
};

export const categories = [
  { slug: "miere", name: "Miere", description: "Miere pură, culesă de albinele din livezile și pădurile României." },
  { slug: "dulceturi", name: "Dulcețuri", description: "Dulcețuri fierte la ceaun, după rețete de la bunici." },
  { slug: "muraturi", name: "Murături & Zacuscă", description: "Bunătăți puse la borcan, cu gust de cămară de sat." },
  { slug: "branzeturi", name: "Brânzeturi", description: "Brânzeturi de oaie și vacă, de la stânele din munți." },
  { slug: "cereale", name: "Cereale & Făinuri", description: "Cereale și făinuri măcinate la moară de piatră." },
];

export const products: Product[] = [
  { id: "1", name: "Miere de salcâm", region: "Bihor", category: "miere", weights: ["250g", "500g", "1kg"], price: 42, image: mierSalcam, swatch: "linear-gradient(160deg,#f5c150,#c78118)", producer: "Familia Popescu", description: "Culesă în luna mai, din pădurile de salcâm din vestul țării. Cristalizează lent, aromă delicată." },
  { id: "2", name: "Miere de tei", region: "Argeș", category: "miere", weights: ["250g", "500g"], price: 38, image: mierTei, swatch: "linear-gradient(160deg,#e6a94a,#8a5a1a)", producer: "Stupina Bunea", description: "Aromă intensă de tei, ideală pentru ceai și pentru dimineți liniștite." },
  { id: "3", name: "Dulceață de afine", region: "Bucovina", category: "dulceturi", weights: ["220g", "400g"], price: 32, image: dulceataAfine, swatch: "linear-gradient(160deg,#5a3a7a,#241436)", producer: "Cămara Anicăi", description: "Afine culese din poienile Bucovinei, fierte încet, fără conservanți." },
  { id: "4", name: "Miere poliflora", region: "Maramureș", category: "miere", weights: ["500g", "1kg"], price: 45, image: mierPoliflora, swatch: "linear-gradient(160deg,#eab24a,#a86b12)", producer: "Apicola Iza", description: "Amestec de flori de câmp și fâneață, gust bogat, complex." },
  { id: "5", name: "Dulceață de trandafiri", region: "Dobrogea", category: "dulceturi", weights: ["220g"], price: 36, image: dulceataTrandafiri, swatch: "linear-gradient(160deg,#e78ba5,#9a3a55)", producer: "Grădina Mariei", description: "Petale de trandafir de Damasc, fierte la ceaun. Parfum inconfundabil." },
  { id: "6", name: "Zacuscă de casă", region: "Moldova", category: "muraturi", weights: ["300g", "500g"], price: 28, image: zacusca, swatch: "linear-gradient(160deg,#c05c2a,#5a2010)", producer: "Bunica Veta", description: "Vinete coapte pe lemne, gogoșari și ceapă. Rețetă de familie." },
  { id: "7", name: "Brânză de burduf", region: "Sibiu", category: "branzeturi", weights: ["300g", "500g"], price: 55, image: branzaBurduf, swatch: "linear-gradient(160deg,#f0e6c8,#b09a60)", producer: "Stâna lui Ion", description: "Brânză frământată în coajă de brad, cu aromă pădurească." },
  { id: "8", name: "Făină de porumb", region: "Banat", category: "cereale", weights: ["500g", "1kg"], price: 18, image: fainaPorumb, swatch: "linear-gradient(160deg,#f5d97a,#b78018)", producer: "Moara Veche", description: "Măcinată la piatră, pentru mămăliga adevărată." },
  { id: "9", name: "Gogoșari în oțet", region: "Oltenia", category: "muraturi", weights: ["720ml"], price: 22, image: gogosari, swatch: "linear-gradient(160deg,#c74a2a,#5a1810)", producer: "Cămara din Deal", description: "Gogoșari cărnoși, în oțet de mere și miere." },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const relatedProducts = (id: string, limit = 4) => {
  const p = getProduct(id);
  if (!p) return [];
  return products.filter((x) => x.id !== id && x.category === p.category).concat(products.filter((x) => x.id !== id && x.category !== p.category)).slice(0, limit);
};
