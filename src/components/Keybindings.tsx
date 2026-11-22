"use client";

import { useMemo, useState } from "react";
import { IconSearch, IconX } from "./Icons";
import { Section } from "./Section";

interface KeybindingItem {
  keys: string[];
  action: string;
  category: "Applications" | "Window Management" | "Session & Utilities" | "Workspaces";
}

const keybindings: KeybindingItem[] = [
  {
    keys: ["SUPER", "Return"],
    action: "Launch Kitty terminal emulator",
    category: "Applications",
  },
  {
    keys: ["SUPER", "D"],
    action: "Launch Fuzzel application launcher",
    category: "Applications",
  },
  {
    keys: ["SUPER", "E"],
    action: "Launch Thunar file manager",
    category: "Applications",
  },
  {
    keys: ["SUPER", "Q"],
    action: "Close active focused window",
    category: "Window Management",
  },
  {
    keys: ["SUPER", "V"],
    action: "Toggle active window floating state",
    category: "Window Management",
  },
  {
    keys: ["SUPER", "F"],
    action: "Toggle active window fullscreen mode",
    category: "Window Management",
  },
  {
    keys: ["SUPER", "Shift", "S"],
    action: "Interactive screenshot selection (flr-shot)",
    category: "Session & Utilities",
  },
  {
    keys: ["SUPER", "/"],
    action: "Display interactive keybinding cheat sheet (flr-keys)",
    category: "Session & Utilities",
  },
  {
    keys: ["SUPER", "L"],
    action: "Lock workstation session immediately (hyprlock)",
    category: "Session & Utilities",
  },
  {
    keys: ["SUPER", "1..9"],
    action: "Switch to workspace 1 through 9",
    category: "Workspaces",
  },
  {
    keys: ["SUPER", "Shift", "1..9"],
    action: "Move active window to workspace 1 through 9",
    category: "Workspaces",
  },
];

function KeyCaps({ keys }: { keys: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {keys.map((key, index) => (
        <span key={`${key}-${index}`} className="flex items-center gap-1.5">
          <kbd className="inline-flex h-6 items-center whitespace-nowrap border-[1.5px] border-hairline bg-surface px-1.5 font-mono text-[11px] font-semibold text-primary">
            {key}
          </kbd>
          {index < keys.length - 1 ? (
            <span aria-hidden="true" className="font-mono text-[11px] text-muted">
              +
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

export function Keybindings() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim();

    if (!needle) {
      return keybindings;
    }

    return keybindings.filter((item) => {
      return (
        item.action.toLowerCase().includes(needle) ||
        item.category.toLowerCase().includes(needle) ||
        item.keys.some((key) => key.toLowerCase().includes(needle))
      );
    });
  }, [query]);

  const filter = (
    <div className="relative w-full md:w-80">
      <label htmlFor="keybinding-filter" className="sr-only">
        Filter shortcuts
      </label>
      <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      <input
        id="keybinding-filter"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Filter shortcuts..."
        autoComplete="off"
        className="w-full appearance-none border-[1.5px] border-hairline bg-canvas py-2.5 pl-9 pr-9 font-mono text-xs text-primary transition-colors placeholder:text-muted focus:border-accent focus:outline-none"
      />
      {query ? (
        <button
          type="button"
          onClick={() => setQuery("")}
          aria-label="Clear filter"
          className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-muted transition-colors hover:text-accent"
        >
          <IconX className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  );

  return (
    <Section
      id="keybindings"
      eyebrow="Workflow reference"
      title="Default keybindings"
      description="Native Lua binds from ~/.config/hypr/hyprland.lua. Filter by action, category, or chord."
      action={filter}
    >
      <p
        aria-live="polite"
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted"
      >
        {filtered.length} of {keybindings.length} shortcuts
      </p>

      {filtered.length === 0 ? (
        <div className="mt-4 border-[1.5px] border-hairline bg-canvas p-8 text-center">
          <p className="font-mono text-xs text-primary">
            No shortcuts match &quot;{query}&quot;.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-4 border-[1.5px] border-hairline bg-surface px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-primary transition-colors hover:border-accent hover:text-accent"
          >
            Clear filter
          </button>
        </div>
      ) : (
        <>
          <div className="mt-4 hidden border-[1.5px] border-hairline bg-canvas lg:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Default FluorineOS keybindings
              </caption>
              <thead>
                <tr className="border-b-[1.5px] border-hairline bg-surface">
                  <th
                    scope="col"
                    className="px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                  >
                    Shortcut
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                  >
                    Action
                  </th>
                  <th
                    scope="col"
                    className="w-52 whitespace-nowrap px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                  >
                    Category
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={item.action}
                    className="border-t-[1.5px] border-hairline transition-colors first:border-t-0 hover:bg-surface"
                  >
                    <td className="px-5 py-3">
                      <KeyCaps keys={item.keys} />
                    </td>
                    <td className="px-5 py-3 text-[13px] text-primary">
                      {item.action}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 font-mono text-[11px] text-muted">
                      {item.category}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-4 space-y-3 lg:hidden">
            {filtered.map((item) => (
              <li
                key={item.action}
                className="border-[1.5px] border-hairline bg-canvas p-4"
              >
                <KeyCaps keys={item.keys} />
                <p className="mt-3 text-[13px] leading-[1.6] text-primary">
                  {item.action}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {item.category}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}
