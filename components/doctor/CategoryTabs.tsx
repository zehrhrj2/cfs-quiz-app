import { categories, type Category, type Locale } from "@/data/doctor-phrases";

type Props = {
  locale: Locale;
  active: Category | null;
  onSelect: (category: Category | null) => void;
  allLabel: string;
};

// flex-wrap, not a horizontally-scrolling strip — the spec is explicit that
// the page must never scroll horizontally, so 8 categories wrap to a few
// rows instead of overflowing sideways.
export default function CategoryTabs({ locale, active, onSelect, allLabel }: Props) {
  const entries = Object.entries(categories) as [
    Category,
    { ua: string; ru: string; icon: string }
  ][];

  function tabClass(isActive: boolean): string {
    return `px-3 py-1.5 rounded-full text-xs font-medium border min-h-[36px] transition-colors ${
      isActive
        ? "bg-brand text-white border-brand"
        : "bg-surface text-text border-border active:bg-border"
    }`;
  }

  return (
    <div className="flex flex-wrap gap-2 px-4 py-3">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={tabClass(active === null)}
      >
        {allLabel}
      </button>
      {entries.map(([key, cat]) => (
        <button
          key={key}
          type="button"
          onClick={() => onSelect(key)}
          className={tabClass(active === key)}
        >
          {cat.icon} {cat[locale]}
        </button>
      ))}
    </div>
  );
}
