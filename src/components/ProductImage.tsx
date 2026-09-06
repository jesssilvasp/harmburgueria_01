type Props = {
  emoji: string;
  gradient: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizes = {
  sm: { box: "h-20 w-20", emoji: "text-4xl" },
  md: { box: "h-28 w-28", emoji: "text-5xl" },
  lg: { box: "h-40 w-full", emoji: "text-7xl" },
  xl: { box: "h-56 w-full", emoji: "text-8xl" },
};

export default function ProductImage({
  emoji,
  gradient,
  imageUrl,
  size = "md",
  className = "",
}: Props) {
  const s = sizes[size];
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} ${s.box} ${className}`}
    >
      {/* Radial highlight */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35), transparent 55%)",
        }}
      />
      {/* Bottom shadow */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <span
            className={`${s.emoji} drop-shadow-2xl`}
            style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.5))" }}
          >
            {emoji}
          </span>
        )}
      </div>
    </div>
  );
}
