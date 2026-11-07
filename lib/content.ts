// Everything the site shows. The admin panel edits this object; the defaults below are used until the first save.

export type Service = { title: string; text: string; image: string };
export type Job = { org: string; span: string; role: string; text: string };
export type Stat = { value: string; label: string };
export type Work = { title: string; client: string; tag: string; year: string; category: string; image: string };
export type PackageItem = { label: string; value: string };
export type Package = { name: string; price: string; blurb: string; popular: boolean; items: PackageItem[] };
export type Platform = { name: string; stat: string; label: string; kind: string; cta: string; notes: string[]; url: string };

export type Content = {
  profile: {
    name: string;
    fullName: string;
    role: string;
    location: string;
    email: string;
    whatsapp: string;
    whatsappLabel: string;
  };
  links: { behance: string; upwork: string; freelancer: string; pexels: string; instagram: string; facebook: string };
  seo: { title: string; description: string };
  hero: { greeting: string; note: string; years: string; yearsLabel: string; image: string };
  services: { title: string; accent: string; lede: string; items: Service[] };
  experience: { title: string; accent: string; items: Job[] };
  about: { title: string; accent: string; paragraphs: string[]; stats: Stat[]; image: string; cta: string };
  portfolio: { title: string; accent: string; seeAllUrl: string; categories: string[]; items: Work[] };
  pricing: { title: string; accent: string; lede: string; note: string; packages: Package[] };
  discuss: { title: string; accent: string; placeholder: string; badges: string[] };
  ticker: string[];
  platforms: { title: string; accent: string; items: Platform[] };
  footer: { title: string; accent: string; bio: string };
};

const pkg = (rows: [string, string][]) => rows.map(([label, value]) => ({ label, value }));

export const defaultContent: Content = {
  profile: {
    name: "Mohiul",
    fullName: "MD Mohiul Islam",
    role: "Graphic Designer",
    location: "Dinajpur, Bangladesh",
    email: "mohiulislam91@gmail.com",
    whatsapp: "8801516777361",
    whatsappLabel: "+880 1516 777 361",
  },
  links: {
    behance: "https://www.behance.net/MohiulIslam16",
    upwork: "https://www.upwork.com/freelancers/~01e3d0c0b187939953?viewMode=1",
    freelancer: "https://www.freelancer.com/u/MohiulUI",
    pexels: "https://www.pexels.com/@md-mohiul-islam-940923000/",
    instagram: "http://instagram.com/mohiul_i",
    facebook: "http://facebook.com/mohiul.islam.146",
  },
  seo: {
    title: "Mohiul Islam — Graphic Designer & Brand Identity Designer",
    description:
      "MD Mohiul Islam is a senior graphic designer from Dinajpur, Bangladesh with 10+ years and 600+ projects. Brand identity, logo design, social media design, packaging, print and photography for clients worldwide.",
  },
  hero: {
    greeting: "Hello!",
    note: "600+ projects delivered for brands in healthcare, media and tech. Highly rated on Upwork & Freelancer.",
    years: "10+ Years",
    yearsLabel: "Experience",
    image: "/me/cut_white.png",
  },
  services: {
    title: "My",
    accent: "Services",
    lede: "Six disciplines, one standard: strategy-led design that looks considered and performs in the real world.",
    items: [
      { title: "Brand Identity", image: "/work/afa_group.jpg", text: "Complete brand systems — logo, colour, typography, and guidelines — crafted to position your business with confidence and clarity." },
      { title: "Print & Collateral", image: "/work/soundskins.jpg", text: "Business cards, brochures, banners, and marketing materials designed with precision for both print and digital formats." },
      { title: "Social Media Design", image: "/work/sm1.jpg", text: "Scroll-stopping visuals for Instagram, Facebook, and LinkedIn — built to grow your brand's presence and drive engagement." },
      { title: "UI / Web Design", image: "/work/sm2.jpg", text: "Clean, user-focused interface designs, wireframes, and high-fidelity mockups delivered with attention to both form and function." },
      { title: "Packaging Design", image: "/work/kangaroo.jpg", text: "Product packaging that commands attention on shelf and screen — from concept to print-ready files, built to sell." },
      { title: "Photography", image: "/work/silence.jpg", text: "Professional photography with a designer's eye for composition and light — portraits, products, and editorial content published on Pexels." },
    ],
  },
  experience: {
    title: "My",
    accent: "Work Experience",
    items: [
      { org: "Backpack Healthcare", span: "6 Years · Retainer", role: "Part-time Graphic Designer", text: "Long-term design partner for brand, social media and marketing collateral." },
      { org: "Lighthouse Internet Media", span: "2 Years · Retainer", role: "Part-time Graphic Designer", text: "Ongoing digital and marketing design for a media company." },
      { org: "Freelancer.com", span: "550+ Projects", role: "Independent Graphic Designer", text: "5-star rated top designer delivering identity, print and social work worldwide." },
      { org: "Upwork", span: "50+ Projects", role: "Freelance Graphic Designer", text: "Top Rated freelancer with a 100% Job Success Score." },
    ],
  },
  about: {
    title: "Why",
    accent: "Hire me",
    paragraphs: [
      "I'm Mohiul Islam — a graphic designer in Dinajpur, Bangladesh. Every pixel I place is intentional, and every concept is rooted in your audience's psychology and your brand's soul.",
      "With 600+ projects across Freelancer.com and Upwork and long-term retainers in healthcare, media and tech, I bring strategic thinking and careful execution to every brief. I'm also a photographer on Pexels.",
    ],
    stats: [
      { value: "600+", label: "Projects completed" },
      { value: "10+", label: "Long-term clients" },
      { value: "10+", label: "Years active" },
    ],
    image: "/me/cut_black.png",
    cta: "Hire me",
  },
  portfolio: {
    title: "my",
    accent: "Portfolio",
    seeAllUrl: "https://www.behance.net/MohiulIslam16",
    categories: ["Social Media", "Logo & Branding", "Packaging & Print"],
    items: [
      { title: "Social Media Campaign Vol.1", client: "Hitech Payments", tag: "Social Media", year: "2024", category: "Social Media", image: "/work/sm1.jpg" },
      { title: "Mobile Social Mockups", client: "Hitech Payments", tag: "Social Media", year: "2024", category: "Social Media", image: "/work/sm2.jpg" },
      { title: "Construction Social Posts", client: "Bid Estimators", tag: "Social Media", year: "2024", category: "Social Media", image: "/work/const.jpg" },
      { title: "Carousel Design", client: "PWD Law Firm", tag: "Carousel", year: "2024", category: "Social Media", image: "/work/law.jpg" },
      { title: "Client Testimonial Graphic", client: "PWD Law Firm", tag: "Social Media", year: "2023", category: "Social Media", image: "/work/randy.jpg" },
      { title: "Capture the Silence", client: "Pixonaut", tag: "Social Media", year: "2023", category: "Social Media", image: "/work/silence.jpg" },
      { title: "Logo & Signage Mockup", client: "Just Hospitality", tag: "Logo Design", year: "2024", category: "Logo & Branding", image: "/work/just_hosp.jpg" },
      { title: "Corporate Identity", client: "AFA Group", tag: "Logo Design", year: "2024", category: "Logo & Branding", image: "/work/afa_group.jpg" },
      { title: "Brand Mark & Signage", client: "Valet Express", tag: "Logo Design", year: "2023", category: "Logo & Branding", image: "/work/valet.jpg" },
      { title: "Brand Identity System", client: "Lucent Capital", tag: "Logo Design", year: "2023", category: "Logo & Branding", image: "/work/lucent.png" },
      { title: "Neon Brand Art Poster", client: "Son of Rust", tag: "Logo · Poster", year: "2024", category: "Logo & Branding", image: "/work/son_of_rust.jpg" },
      { title: "Logotype Design", client: "Vetro", tag: "Logo Design", year: "2023", category: "Logo & Branding", image: "/work/vetrologo.jpg" },
      { title: "Shopping Bag Design", client: "Vetro", tag: "Packaging", year: "2023", category: "Packaging & Print", image: "/work/vetrobag.jpg" },
      { title: "Product Packaging", client: "Kangaroo Dog Treat Co.", tag: "Packaging", year: "2024", category: "Packaging & Print", image: "/work/kangaroo.jpg" },
      { title: "Medical Box Packaging", client: "COVID-19 Test", tag: "Packaging", year: "2022", category: "Packaging & Print", image: "/work/pkg.png" },
      { title: "Bírílerí Book Cover", client: "Şahizer Nur Öztuna", tag: "Print Design", year: "2024", category: "Packaging & Print", image: "/work/birileri.jpg" },
      { title: "Product Brochure Catalogue", client: "Soundskins Global", tag: "Brochure", year: "2022", category: "Packaging & Print", image: "/work/soundskins.jpg" },
    ],
  },
  pricing: {
    title: "Packages That",
    accent: "Grow Your Brand",
    lede: "Transparent monthly social media packages for consistent, high-quality content. No setup fees, no surprises.",
    note: "Need something different?",
    packages: [
      {
        name: "Essential",
        price: "350",
        popular: false,
        blurb: "Perfect for small businesses and personal brands starting their social media journey.",
        items: pkg([["Image Posts", "10"], ["Carousel Post", "2 (5 img/post)"], ["Reels Post", "1 (30–40s)"], ["Platform Size Optimize", "1"], ["Copywriting", "No"], ["Revisions", "1"], ["Total Posts", "13"]]),
      },
      {
        name: "Professional",
        price: "500",
        popular: true,
        blurb: "Perfect for growing businesses ready to build a consistent and engaging social media presence.",
        items: pkg([["Image Posts", "11"], ["Carousel Post", "4 (5 img/post)"], ["Reels Post", "2 (30–40s)"], ["Platform Size Optimize", "3"], ["Copywriting", "Optional"], ["Revisions", "2"], ["Total Posts", "17"]]),
      },
      {
        name: "Enterprise",
        price: "750",
        popular: false,
        blurb: "Perfect for brands and businesses that need a complete, high-volume social media content solution.",
        items: pkg([["Image Posts", "14"], ["Carousel Post", "4 (10 img/post)"], ["Reels Post", "4 (30–40s)"], ["Platform Size Optimize", "5"], ["Copywriting", "Optional"], ["Revisions", "3"], ["Total Posts", "22"]]),
      },
    ],
  },
  discuss: {
    title: "Have an Awesome Project Idea?",
    accent: "Let's Discuss",
    placeholder: "Tell me about your project…",
    badges: ["5.0 average rating", "600+ projects delivered", "Top Rated on Upwork"],
  },
  ticker: ["Brand Identity", "Logo Design", "Print & Collateral", "UI Design", "Social Media", "Packaging Design", "Photography", "Illustration"],
  platforms: {
    title: "Find me on",
    accent: "global platforms",
    items: [
      { name: "Freelancer.com", stat: "550+", label: "Projects", kind: "Freelance marketplace", cta: "Hire me on Freelancer", notes: ["5-Star Rated", "Top Designer"], url: "https://www.freelancer.com/u/MohiulUI" },
      { name: "Upwork", stat: "50+", label: "Projects", kind: "Freelance marketplace", cta: "Hire me on Upwork", notes: ["Top Rated", "JSS 100%"], url: "https://www.upwork.com/freelancers/~01e3d0c0b187939953?viewMode=1" },
      { name: "Behance", stat: "100+", label: "Case studies", kind: "Portfolio", cta: "View case studies", notes: ["Brand systems", "Full case studies"], url: "https://www.behance.net/MohiulIslam16" },
    ],
  },
  footer: {
    title: "Let's Connect",
    accent: "there",
    bio: "Graphic designer & photographer from Dinajpur, Bangladesh — crafting brand identities, social content and packaging for clients worldwide.",
  },
};

export const waLink = (c: Content, text?: string) =>
  `https://wa.me/${c.profile.whatsapp.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

// Fill any fields missing from older saved data with defaults, so new fields never crash the site.
export function withDefaults(saved: Partial<Content> | null | undefined): Content {
  if (!saved) return defaultContent;
  const out = { ...defaultContent } as Record<string, unknown>;
  for (const [k, v] of Object.entries(saved)) {
    const base = (defaultContent as Record<string, unknown>)[k];
    out[k] = base && typeof base === "object" && !Array.isArray(base) && v && typeof v === "object" ? { ...base, ...v } : v;
  }
  return out as Content;
}
