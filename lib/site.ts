// Canonical URL: set NEXT_PUBLIC_SITE_URL once a custom domain exists; Vercel provides the production URL otherwise.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  name: "Mohiul Islam",
  fullName: "MD Mohiul Islam",
  title: "Mohiul Islam — Graphic Designer & Brand Identity Designer",
  description:
    "MD Mohiul Islam is a senior graphic designer from Dinajpur, Bangladesh with 8+ years and 600+ projects. Brand identity, logo design, social media design, packaging, print and photography for clients worldwide.",
  locale: "en_US",
  keywords: [
    "Mohiul Islam",
    "MD Mohiul Islam",
    "graphic designer",
    "brand identity designer",
    "logo designer",
    "social media designer",
    "packaging designer",
    "freelance graphic designer Bangladesh",
    "graphic designer Dinajpur",
    "Upwork graphic designer",
    "Freelancer.com designer",
    "brochure design",
    "photographer Bangladesh",
  ],
};
