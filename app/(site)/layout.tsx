import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      {children}
    </>
  );
}
