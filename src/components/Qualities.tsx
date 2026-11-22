import React from "react";
import { IconLayers, IconCode, IconShield, IconKeyboard } from "./Icons";

const qualities = [
  {
    title: "Cohesive Out of the Box",
    description:
      "Unified Hyprland environment with preconfigured Waybar, Fuzzel, SwayNC, Kitty, and boot splash ready on first boot.",
    icon: IconLayers,
    badge: "Hyprland 0.55+",
  },
  {
    title: "Plain-Text Customization",
    description:
      "Every visual rule, animation curve, and keybinding lives in clean Lua, CSS, and INI files inside ~/.config/.",
    icon: IconCode,
    badge: "Lua & CSS",
  },
  {
    title: "Debian 13 Foundation",
    description:
      "Built on Debian Trixie (x86_64) with Hyprland pinned from trixie-backports, PipeWire audio, zstd ZRAM, and an active ufw firewall.",
    icon: IconShield,
    badge: "Debian Trixie",
  },
  {
    title: "Keyboard-Driven Flow",
    description:
      "Fast console login via greetd and tuigreet, predictable tiling layouts, and built-in CLI utilities (flr-shot, flr-keys, flr-doctor).",
    icon: IconKeyboard,
    badge: "CLI & Keybinds",
  },
];

export function Qualities() {
  return (
    <section id="qualities" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="mb-12">
        <h2 className="text-xs uppercase tracking-wider font-semibold text-[#B4F03A] mb-3">
          Design & Architecture
        </h2>
        <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E2E8F0]">
          Engineered for focus and predictability
        </p>
        <p className="mt-3 text-sm text-[#6E7681] max-w-2xl leading-relaxed">
          FluorineOS avoids complex abstractions. Everything in the user space is
          inspectable, editable, and backed by Debian package management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {qualities.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 bg-[#0A0D10] rounded-[6px] border border-[#1C2229] hover:border-[#B4F03A] transition-colors"
              style={{ borderWidth: "1.5px" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-[6px] bg-[#000000] border border-[#1C2229] flex items-center justify-center text-[#B4F03A]" style={{ borderWidth: "1.5px" }}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-[#000000] border border-[#1C2229] text-[#6E7681]">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-base font-semibold text-[#E2E8F0] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#6E7681] leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
