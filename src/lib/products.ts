import shirt1 from "@/assets/p-shirt-1.jpg";
import shirt2 from "@/assets/p-shirt-2.jpg";
import chino1 from "@/assets/p-chino-1.jpg";
import tee1 from "@/assets/p-tee-1.jpg";
import blazer1 from "@/assets/p-blazer-1.jpg";
import polo1 from "@/assets/p-polo-1.jpg";
import jeans1 from "@/assets/p-jeans-1.jpg";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  occasion: string[];
  price: number;
  mrp: number;
  image: string;
  images: string[];
  badge?: "New" | "Best Seller" | "Limited";
  colors: { name: string; hex: string }[];
  sizes: string[];
  fabric: string;
  fit: string;
  rating: number;
  reviews: number;
  description: string;
};

const make = (p: Omit<Product, "slug" | "discount" | "images"> & { images?: string[] }): Product => ({
  ...p,
  slug: p.id,
  images: p.images ?? [p.image, p.image, p.image],
});

export const products: Product[] = [
  make({
    id: "royal-oxford-shirt",
    name: "Royal Oxford Button-Down",
    category: "shirts",
    categoryLabel: "Premium Shirts",
    occasion: ["office", "wedding"],
    price: 1899,
    mrp: 3499,
    image: shirt1,
    badge: "Best Seller",
    colors: [
      { name: "Royal Blue", hex: "#1d3a8a" },
      { name: "White", hex: "#ffffff" },
      { name: "Navy", hex: "#071D3A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    fabric: "100% Egyptian Cotton, 120s",
    fit: "Tailored Slim",
    rating: 4.8,
    reviews: 214,
    description:
      "Crafted from finest Egyptian cotton with a soft hand-feel and signature mother-of-pearl buttons. The Royal Oxford is built for boardrooms and ceremonies alike.",
  }),
  make({
    id: "crisp-white-linen",
    name: "Crisp White Linen Shirt",
    category: "shirts",
    categoryLabel: "Linen Shirts",
    occasion: ["vacation", "summer"],
    price: 2199,
    mrp: 3999,
    image: shirt2,
    badge: "New",
    colors: [
      { name: "Optic White", hex: "#fafafa" },
      { name: "Sand", hex: "#d8c7a6" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: "100% European Flax Linen",
    fit: "Relaxed",
    rating: 4.7,
    reviews: 98,
    description:
      "Breathable, garment-washed European linen. Designed for coastal afternoons and golden-hour terraces.",
  }),
  make({
    id: "tuscan-chinos",
    name: "Tuscan Cotton Chinos",
    category: "trousers",
    categoryLabel: "Chinos",
    occasion: ["office", "weekend"],
    price: 2299,
    mrp: 4299,
    image: chino1,
    colors: [
      { name: "Sand", hex: "#d8c7a6" },
      { name: "Navy", hex: "#071D3A" },
      { name: "Olive", hex: "#556B2F" },
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    fabric: "98% Cotton, 2% Elastane",
    fit: "Slim Tapered",
    rating: 4.9,
    reviews: 312,
    description: "4-way stretch chino with a clean tapered leg and reinforced stress points.",
  }),
  make({
    id: "obsidian-oversized-tee",
    name: "Obsidian Oversized Tee",
    category: "tshirts",
    categoryLabel: "Oversized T-Shirts",
    occasion: ["weekend", "summer"],
    price: 999,
    mrp: 1799,
    image: tee1,
    colors: [
      { name: "Obsidian", hex: "#111111" },
      { name: "Bone", hex: "#ece6da" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: "240 GSM Combed Cotton",
    fit: "Oversized Drop-Shoulder",
    rating: 4.6,
    reviews: 521,
    description: "Heavyweight combed cotton with a drop shoulder and ribbed neckline.",
  }),
  make({
    id: "midnight-blazer",
    name: "Midnight Wool Blazer",
    category: "blazers",
    categoryLabel: "Blazers",
    occasion: ["wedding", "party"],
    price: 7499,
    mrp: 13999,
    image: blazer1,
    badge: "Limited",
    colors: [
      { name: "Charcoal", hex: "#2b2b2b" },
      { name: "Navy", hex: "#071D3A" },
    ],
    sizes: ["38", "40", "42", "44", "46"],
    fabric: "Italian Wool Blend",
    fit: "Tailored",
    rating: 4.9,
    reviews: 76,
    description: "Half-canvas construction with a soft shoulder line and natural lapel roll.",
  }),
  make({
    id: "olive-knit-polo",
    name: "Olive Textured Knit Polo",
    category: "polos",
    categoryLabel: "Polo T-Shirts",
    occasion: ["weekend", "office"],
    price: 1499,
    mrp: 2999,
    image: polo1,
    colors: [
      { name: "Olive", hex: "#556B2F" },
      { name: "Cream", hex: "#f1ead7" },
      { name: "Royal", hex: "#071D3A" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: "Mercerised Pima Cotton Pique",
    fit: "Regular",
    rating: 4.7,
    reviews: 187,
    description: "Mercerised cotton with a subtle textured weave and tipped collar.",
  }),
  make({
    id: "indigo-slim-jeans",
    name: "Deep Indigo Slim Jeans",
    category: "jeans",
    categoryLabel: "Jeans",
    occasion: ["weekend", "date-night"],
    price: 2499,
    mrp: 4499,
    image: jeans1,
    colors: [
      { name: "Deep Indigo", hex: "#0e1a3a" },
      { name: "Washed Black", hex: "#1a1a1a" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    fabric: "12oz Selvedge Denim",
    fit: "Slim Straight",
    rating: 4.8,
    reviews: 245,
    description: "Selvedge denim with a deep rope-dye indigo and clean stitching.",
  }),
  make({
    id: "ceremonial-silk-shirt",
    name: "Ceremonial Silk Shirt",
    category: "shirts",
    categoryLabel: "Formal Shirts",
    occasion: ["wedding", "festive"],
    price: 3899,
    mrp: 6999,
    image: shirt1,
    badge: "Limited",
    colors: [
      { name: "Royal", hex: "#071D3A" },
      { name: "Ivory", hex: "#fdf6e3" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: "Silk-Cotton Blend",
    fit: "Tailored",
    rating: 4.9,
    reviews: 64,
    description: "A festive piece with subtle sheen and hand-stitched collar.",
  }),
];

export const categories = [
  { slug: "shirts", label: "Shirts", image: "/cat-shirts.jpg" },
  { slug: "trousers", label: "Trousers", image: "/cat-trousers.jpg" },
  { slug: "polos", label: "Polos", image: "/cat-polos.jpg" },
  { slug: "blazers", label: "Blazers", image: "/cat-blazers.jpg" },
  { slug: "tshirts", label: "T-Shirts" },
  { slug: "jeans", label: "Jeans" },
];

export const occasions = [
  { slug: "office", label: "The Office" },
  { slug: "wedding", label: "Wedding" },
  { slug: "party", label: "After Hours" },
  { slug: "vacation", label: "Vacation" },
  { slug: "weekend", label: "Weekend" },
  { slug: "festive", label: "Festive" },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(cat: string) {
  return products.filter((p) => p.category === cat);
}
