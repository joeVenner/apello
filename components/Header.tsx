import Link from "next/link";

import csx from "../lib/csx";

export default function Header({ children }) {
  return (
    <header
      className={csx(
        "relative",
        "flex items-center gap-x-4",
        "h-16",
        "p-1 md:p-2",
        "text-white",
        "border-b border-white/10 backdrop-blur-xl bg-surface/80",
      )}
    >
      {children}
    </header>
  );
}

Header.Menu = function HeaderMenu({ children }) {
  return (
    <ul
      className={csx(
        "flex-col md:flex md:flex-row justify-center items-center gap-x-3 md:ml-auto",
        "uppercase",
        "bg-fauxblack md:bg-transparent",
      )}
    >
      {children}
    </ul>
  );
};

Header.MenuItem = function HeaderMenuItem({ disabled = false, children }) {
  return (
    <li
      className={csx(
        "group",
        "relative",
        "box-border ml-0",
        "text-md lg:text-lg font-bold",
        "hover:text-apello",
        "cursor-pointer",
      )}
    >
      {children}
    </li>
  );
};

Header.MenuLink = function HeaderMenuLink({
  text,
  disabled = false,
  href = "#",
  newTab = false,
}) {
  return (
    <Header.MenuItem disabled={disabled}>
      <Link
        href={href}
        target={newTab ? "_blank" : undefined}
        className={csx(
          "selected",
          disabled && "selected-dis",
          "p-1 md:py-3",
          "ring-violet focus:outline-none focus-visible:ring-4",
          "rounded-xl",
        )}
      >
        {text}
      </Link>
    </Header.MenuItem>
  );
};

Header.MenuDropdown = function HeaderMenuDropdown({ text = "", children }) {
  return (
    <Header.MenuItem>
      <div className="flex items-center gap-x-1 px-1 py-1 md:py-3">
        {text}
        <Header.MenuCaret />
      </div>
      <div
        className={csx(
          "absolute",
          "hidden hover:flex group-hover:flex flex-col",
          "border border-white/10 bg-surface/90 backdrop-blur-xl rounded-xl shadow-glass",
          "w-44 left-[-20px] px-4 py-1 md:py-3 z-20",
        )}
      >
        {children}
      </div>
    </Header.MenuItem>
  );
};

Header.MenuDropdownLink = function HeaderMenuDropdownLink({
  disabled = false,
  href,
  children,
}) {
  return (
    <Link
      href={disabled ? "#" : href}
      className={csx(
        "block inline-flex gap-1 items-center",
        "p-1 pr-1",
        "text-base text-white whitespace-nowrap hover:bg-white/10 rounded-lg hover:text-apello",
        "transition-colors duration-200",
        disabled && "cursor-not-allowed",
      )}
    >
      {children}
    </Link>
  );
};

Header.MenuCaret = function HeaderMenuCaret() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};
