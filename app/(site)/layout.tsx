import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeScript } from "@/components/ThemeToggle";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <ThemeScript />
      <SmoothScroll />
      <Cursor />
      {children}
    </>
  );
}
