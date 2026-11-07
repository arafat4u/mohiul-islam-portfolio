import type { StaticImageData } from "next/image";
import sm1 from "@/assets/work/sm1.jpg";
import sm2 from "@/assets/work/sm2.jpg";
import construction from "@/assets/work/const.jpg";
import law from "@/assets/work/law.jpg";
import randy from "@/assets/work/randy.jpg";
import silence from "@/assets/work/silence.jpg";
import justHosp from "@/assets/work/just_hosp.jpg";
import afa from "@/assets/work/afa_group.jpg";
import valet from "@/assets/work/valet.jpg";
import lucent from "@/assets/work/lucent.png";
import sonOfRust from "@/assets/work/son_of_rust.jpg";
import vetroLogo from "@/assets/work/vetrologo.jpg";
import vetroBag from "@/assets/work/vetrobag.jpg";
import kangaroo from "@/assets/work/kangaroo.jpg";
import pkg from "@/assets/work/pkg.png";
import birileri from "@/assets/work/birileri.jpg";
import soundskins from "@/assets/work/soundskins.jpg";

export const links = {
  email: "mohiulislam91@gmail.com",
  whatsapp: "https://wa.me/8801516777361",
  whatsappLabel: "+880 1516 777 361",
  freelancer: "https://www.freelancer.com/u/MohiulUI",
  upwork: "https://www.upwork.com/freelancers/~01e3d0c0b187939953?viewMode=1",
  behance: "https://www.behance.net/MohiulIslam16",
  pexels: "https://www.pexels.com/@md-mohiul-islam-940923000/",
  instagram: "http://instagram.com/mohiul_i",
  facebook: "http://facebook.com/mohiul.islam.146",
};

export type Category = "Social Media" | "Logo & Branding" | "Packaging & Print";

export type Work = {
  title: string;
  client: string;
  tag: string;
  year: number;
  category: Category;
  image: StaticImageData;
};

export const works: Work[] = [
  { title: "Social Media Campaign Vol.1", client: "Hitech Payments", tag: "Social Media", year: 2024, category: "Social Media", image: sm1 },
  { title: "Mobile Social Mockups", client: "Hitech Payments", tag: "Social Media", year: 2024, category: "Social Media", image: sm2 },
  { title: "Construction Social Posts", client: "Bid Estimators", tag: "Social Media", year: 2024, category: "Social Media", image: construction },
  { title: "Carousel Design", client: "PWD Law Firm", tag: "Carousel", year: 2024, category: "Social Media", image: law },
  { title: "Client Testimonial Graphic", client: "PWD Law Firm", tag: "Social Media", year: 2023, category: "Social Media", image: randy },
  { title: "Capture the Silence", client: "Pixonaut", tag: "Social Media", year: 2023, category: "Social Media", image: silence },
  { title: "Logo & Signage Mockup", client: "Just Hospitality", tag: "Logo Design", year: 2024, category: "Logo & Branding", image: justHosp },
  { title: "Corporate Identity", client: "AFA Group", tag: "Logo Design", year: 2024, category: "Logo & Branding", image: afa },
  { title: "Brand Mark & Signage", client: "Valet Express", tag: "Logo Design", year: 2023, category: "Logo & Branding", image: valet },
  { title: "Brand Identity System", client: "Lucent Capital", tag: "Logo Design", year: 2023, category: "Logo & Branding", image: lucent },
  { title: "Neon Brand Art Poster", client: "Son of Rust", tag: "Logo · Poster", year: 2024, category: "Logo & Branding", image: sonOfRust },
  { title: "Logotype Design", client: "Vetro", tag: "Logo Design", year: 2023, category: "Logo & Branding", image: vetroLogo },
  { title: "Shopping Bag Design", client: "Vetro", tag: "Packaging", year: 2023, category: "Packaging & Print", image: vetroBag },
  { title: "Product Packaging", client: "Kangaroo Dog Treat Co.", tag: "Packaging", year: 2024, category: "Packaging & Print", image: kangaroo },
  { title: "Medical Box Packaging", client: "COVID-19 Test", tag: "Packaging", year: 2022, category: "Packaging & Print", image: pkg },
  { title: "Bírílerí Book Cover", client: "Şahizer Nur Öztuna", tag: "Print Design", year: 2024, category: "Packaging & Print", image: birileri },
  { title: "Product Brochure Catalogue", client: "Soundskins Global", tag: "Brochure", year: 2022, category: "Packaging & Print", image: soundskins },
];

export const services = [
  { title: "Brand Identity", text: "Complete brand systems — logo, colour, typography, and guidelines — crafted to position your business with confidence and clarity." },
  { title: "Print & Collateral", text: "Business cards, brochures, banners, and marketing materials designed with precision for both print and digital formats." },
  { title: "Social Media Design", text: "Scroll-stopping visuals for Instagram, Facebook, and LinkedIn — built to grow your brand's presence and drive engagement." },
  { title: "UI / Web Design", text: "Clean, user-focused interface designs, wireframes, and high-fidelity mockups delivered with attention to both form and function." },
  { title: "Packaging Design", text: "Product packaging that commands attention on shelf and screen — from concept to print-ready files, built to sell." },
  { title: "Photography", text: "Professional photography with a designer's eye for composition and light — portraits, products, and editorial content published on Pexels." },
];

export const experience = [
  {
    org: "Backpack Healthcare",
    role: "Part-time Graphic Designer",
    span: "6 Years · Retainer",
    text: "Long-term design partner for brand, social media and marketing collateral.",
  },
  {
    org: "Lighthouse Internet Media",
    role: "Part-time Graphic Designer",
    span: "2 Years · Retainer",
    text: "Ongoing digital and marketing design for a media company.",
  },
  {
    org: "Freelancer.com",
    role: "Independent Graphic Designer",
    span: "550+ Projects",
    text: "5-star rated top designer delivering identity, print and social work worldwide.",
  },
  {
    org: "Upwork",
    role: "Freelance Graphic Designer",
    span: "50+ Projects",
    text: "Top Rated freelancer with a 100% Job Success Score.",
  },
];

export const packages = [
  {
    name: "Essential",
    price: 350,
    blurb: "Perfect for small businesses and personal brands starting their social media journey.",
    items: ["Image Posts — 10", "Carousel Post — 2 (5 img/post)", "Reels Post — 1 (30–40s)", "Platform Size Optimize — 1", "Copywriting — No", "Revisions — 1", "Total Posts — 13"],
  },
  {
    name: "Professional",
    price: 500,
    popular: true,
    blurb: "Perfect for growing businesses ready to build a consistent and engaging social media presence.",
    items: ["Image Posts — 11", "Carousel Post — 4 (5 img/post)", "Reels Post — 2 (30–40s)", "Platform Size Optimize — 3", "Copywriting — Optional", "Revisions — 2", "Total Posts — 17"],
  },
  {
    name: "Enterprise",
    price: 750,
    blurb: "Perfect for brands and businesses that need a complete, high-volume social media content solution.",
    items: ["Image Posts — 14", "Carousel Post — 4 (10 img/post)", "Reels Post — 4 (30–40s)", "Platform Size Optimize — 5", "Copywriting — Optional", "Revisions — 3", "Total Posts — 22"],
  },
];

export const ticker = ["Brand Identity", "Logo Design", "Print & Collateral", "UI Design", "Social Media", "Packaging Design", "Photography", "Illustration"];
