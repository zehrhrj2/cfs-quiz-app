type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <div className="px-4 pt-3">
      <input
        type="search"
        inputMode="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-base text-text placeholder:text-muted min-h-[48px] focus:outline-none focus:border-brand"
      />
    </div>
  );
}
