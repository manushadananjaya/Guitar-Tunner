import { cn } from "@/lib/utils";

export interface SegmentedProps<T extends string | number> {
  value: T;
  onChange: (value: T) => void;
  items: { value: T; label: string }[];
  /** Accessible group label. */
  label: string;
  className?: string;
}

/** The pill-group toggle used across the practice tools. */
export function Segmented<T extends string | number>({
  value,
  onChange,
  items,
  label,
  className,
}: SegmentedProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex flex-wrap gap-1 rounded-xl border border-line bg-surface/40 p-1", className)}
    >
      {items.map((item) => (
        <button
          key={String(item.value)}
          type="button"
          aria-pressed={value === item.value}
          onClick={() => onChange(item.value)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
            value === item.value
              ? "bg-brass text-brass-contrast"
              : "text-ink-muted hover:text-ink hover:bg-surface-raised/60",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

/** Labelled native select, styled to match. Native so it works well on phones. */
export function SelectField({
  label,
  value,
  onChange,
  children,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1", className)}>
      <span className="eyebrow">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-line-strong bg-surface/60 px-3 py-2 text-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
      >
        {children}
      </select>
    </label>
  );
}
