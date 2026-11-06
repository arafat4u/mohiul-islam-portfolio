// The wordmark is a white-on-transparent PNG used as a CSS mask, so it can take any colour.
export default function Logo({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <span
      aria-hidden
      style={style}
      className={`block aspect-[1320/247] bg-current [mask-image:url(/logo.png)] [mask-repeat:no-repeat] [mask-size:contain] ${className}`}
    />
  );
}
