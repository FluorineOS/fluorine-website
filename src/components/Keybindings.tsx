"use client";

import React, { useState } from "react";
import { IconSearch } from "./Icons";

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

export function Keybindings() {
  const [query, setQuery] = useState("");

  const filtered = keybindings.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    const matchAction = item.action.toLowerCase().includes(q);
    const matchCategory = item.category.toLowerCase().includes(q);
    const matchKeys = item.keys.some((k) => k.toLowerCase().includes(q));
    return matchAction || matchCategory || matchKeys;
  });

  return (
    <section id="keybindings" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-xs uppercase tracking-wider font-semibold text-[#B4F03A] mb-3">
            Workflow Reference
          </h2>
          <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E2E8F0]">
            Default Keybindings
          </p>
          <p className="mt-2 text-sm text-[#6E7681]">
            Configured in <code className="text-[#E2E8F0] font-mono">~/.config/hypr/hyprland.lua</code> via native Lua binds.
          </p>
        </div>

        {/* Client-side Search Input */}
        <div className="relative w-full md:w-80">
          <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E7681]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shortcuts or actions..."
            className="w-full bg-[#0A0D10] text-[#E2E8F0] placeholder-[#6E7681] text-xs font-mono pl-10 pr-4 py-2.5 rounded-[6px] border border-[#1C2229] focus:outline-none focus:border-[#B4F03A] transition-colors"
            style={{ borderWidth: "1.5px" }}
          />
        </div>
      </div>

      {/* Table Container */}
      <div
        className="w-full bg-[#0A0D10] rounded-[6px] border border-[#1C2229] overflow-hidden"
        style={{ borderWidth: "1.5px" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr
                className="border-b border-[#1C2229] bg-[#000000] text-[#6E7681] font-mono text-xs uppercase"
                style={{ borderBottomWidth: "1.5px" }}
              >
                <th className="py-3 px-4 sm:px-6 font-medium">Shortcut Chord</th>
                <th className="py-3 px-4 sm:px-6 font-medium">Action Description</th>
                <th className="py-3 px-4 sm:px-6 font-medium hidden sm:table-cell">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2229]">
              {filtered.length > 0 ? (
                filtered.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#12171F] transition-colors"
                  >
                    <td className="py-3 px-4 sm:px-6 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.keys.map((k, kIdx) => (
                          <React.Fragment key={kIdx}>
                            <kbd
                              className="px-2 py-1 bg-[#000000] text-[#E2E8F0] border border-[#1C2229] rounded-[4px] font-mono text-xs font-semibold"
                              style={{ borderWidth: "1.5px" }}
                            >
                              {k}
                            </kbd>
                            {kIdx < item.keys.length - 1 && (
                              <span className="text-[#6E7681] font-mono text-xs">+</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-[#E2E8F0]">
                      {item.action}
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-[#6E7681] font-mono text-xs hidden sm:table-cell">
                      {item.category}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-[#6E7681] font-mono text-xs">
                    No matching keybindings found for &quot;{query}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
