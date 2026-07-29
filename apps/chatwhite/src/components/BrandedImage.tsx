import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  badge?: string;
  caption?: string;
  priority?: boolean;
};

export function BrandedImage({
  src,
  alt,
  width = 1280,
  height = 800,
  fill,
  sizes,
  className = "object-cover",
  badge,
  caption,
  priority,
}: Props) {
  const inner = fill ? (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={`${className} transition duration-700 group-hover:scale-[1.03]`}
      priority={priority}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={`h-auto w-full ${className} transition duration-700 group-hover:scale-[1.03]`}
      priority={priority}
    />
  );

  return (
    <figure
      className={`group relative overflow-hidden ${fill ? "h-full w-full" : "rounded-2xl border border-[var(--cw-line)] bg-[var(--cw-panel)] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]"}`}
    >
      <div className={`relative ${fill ? "h-full min-h-[240px] w-full" : "w-full"}`}>
        {inner}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--cw-ink)]/35 via-transparent to-transparent"
          aria-hidden
        />
        {badge && (
          <p className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-[var(--cw-ink)]/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-md">
            {badge}
          </p>
        )}
      </div>
      {caption && (
        <figcaption className="px-4 py-3 text-sm leading-relaxed text-[var(--cw-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
