import peanuts from "@/assets/raw-peanuts.jpg?url";
import chana from "@/assets/roasted-chana-dal.jpg?url";
import toor from "@/assets/toor-dal.jpg?url";
import moong from "@/assets/moong-dal.jpg?url";
import urad from "@/assets/urad-dal.jpg?url";

export type Product = {
  id: string;
  name: string;
  local: string;
  image: string;
  weight: string;
  price: number;
  note: string;
  status: "available" | "coming soon";
};

export const products: Product[] = [
  {
    id: "raw-peanuts",
    name: "Raw Peanuts",
    local: "వేరుసెనగలు | मूंगफली",
    image: peanuts,
    weight: "500 g",
    price: 99,
    note: "Carefully handpicked raw peanuts, packed with goodness for everyday cooking and snacking.",
    status: "available",
  },
  {
    id: "roasted-chana-dal",
    name: "Roasted Chana Dal",
    local: "పుట్నాలు | भुना चना दाल",
    image: chana,
    weight: "500 g",
    price: 89,
    note: "Crisp, carefully roasted chana dal — a wholesome protein-rich snack straight from the farm.",
    status: "available",
  },
  {
    id: "toor-dal",
    name: "Toor Dal",
    local: "కందిపప్పు | तूर दाल",
    image: toor,
    weight: "500 g",
    price: 119,
    note: "Creamy, golden arhar dal — perfect for comforting sambar and dal tadka.",
    status: "coming soon",
  },
  {
    id: "moong-dal",
    name: "Moong Dal",
    local: "పెసరపప్పు | मूंग दाल",
    image: moong,
    weight: "500 g",
    price: 109,
    note: "Light, easy-to-digest moong dal — a kitchen staple for healthy everyday meals.",
    status: "coming soon",
  },
  {
    id: "urad-dal",
    name: "Urad Dal",
    local: "మినపప్పు | उड़द दाल",
    image: urad,
    weight: "500 g",
    price: 129,
    note: "Premium split urad dal — ideal for soft idlis, crisp dosas and rich dals.",
    status: "coming soon",
  },
];

export const floatingItems = [
  {
    image: peanuts,
    alt: "Pure Select Raw Peanuts 500g pack",
    size: "w-40 sm:w-56 md:w-64 lg:w-72",
    position: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20",
    animation: "animate-float",
    depth: 8,
  },
  {
    image: chana,
    alt: "Pure Select Roasted Chana Dal 500g pack",
    size: "w-16 sm:w-24 md:w-32",
    position: "left-[4%] top-[6%] z-10",
    animation: "animate-float-1",
    depth: 18,
  },
  {
    image: toor,
    alt: "Pure Select Toor Dal 500g pack",
    size: "w-16 sm:w-24 md:w-32",
    position: "right-[6%] top-[12%] z-10",
    animation: "animate-float-2",
    depth: -14,
  },
  {
    image: moong,
    alt: "Pure Select Moong Dal 500g pack",
    size: "w-16 sm:w-24 md:w-32",
    position: "left-[8%] bottom-[10%] z-10",
    animation: "animate-float-3",
    depth: 16,
  },
  {
    image: urad,
    alt: "Pure Select Urad Dal 500g pack",
    size: "w-16 sm:w-24 md:w-32",
    position: "right-[4%] bottom-[6%] z-10",
    animation: "animate-float-4",
    depth: -12,
  },
];
