import csx from "../lib/csx";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  className,
}: SearchBarProps) {
  return (
    <div
      className={csx(
        "flex items-center gap-x-2 border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl h-12 px-4 focus-within:border-violet focus-within:ring-1 focus-within:ring-violet/50 transition-colors duration-200",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 text-muted shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none w-full text-white placeholder:text-muted"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="text-muted hover:text-white transition-colors shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}