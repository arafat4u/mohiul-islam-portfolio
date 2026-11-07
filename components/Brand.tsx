import Logo from "@/components/Logo";

// Orange monogram disc + wordmark, used in the header and footer.
export default function Brand({ size = "md" }: { size?: "sm" | "md" }) {
  const disc = size === "sm" ? "h-9 w-9" : "h-10 w-10 md:h-11 md:w-11";
  const word = size === "sm" ? "h-5" : "h-5 md:h-6";
  return (
    <span className="flex items-center gap-2.5">
      <span className={`grid shrink-0 place-items-center rounded-full bg-orange ${disc}`}>
        <span
          aria-hidden
          className="block aspect-[212/245] h-[55%] bg-white [mask-image:url(/mark.png)] [mask-repeat:no-repeat] [mask-size:contain]"
        />
      </span>
      <Logo className={`${word} w-auto text-white`} />
    </span>
  );
}
