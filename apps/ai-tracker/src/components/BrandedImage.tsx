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
      className={`${className} transition duration-700 group-hover:scale-[1.02]`}
      priority={priority}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={`h-auto w-full ${className} transition duration-700 group-hover:scale-[1.02]`}
      priority={priority}
    />
  );

  return (
    <figure
      className={`group relative overflow-hidden ${fill ? "h-full w-full" : "rounded-2xl border border-[var(--at-line)] bg-[var(--at-panel)]"}`}
    >
      <div className={`relative ${fill ? "h-full min-h-[240px] w-full" : "w-full"}`}>
        {inner}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--at-ink)]/55 via-transparent to-transparent"
          aria-hidden
        />
        <div className="absolute left-4 top-4 rounded-xl border border-[var(--at-signal)]/35 bg-[var(--at-ink)]/85 px-3 py-1.5 text-sm font-bold backdrop-blur-md">
          AI Tracker <span className="text-[var(--at-signal)]">HU</span>
        </div>
        {badge && (
          <p className="absolute bottom-4 left-4 rounded-lg bg-[var(--at-warn)]/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            {badge}
          </p>
        )}
      </div>
      {caption && (
        <figcaption className="px-4 py-3 text-sm leading-relaxed text-[var(--at-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
