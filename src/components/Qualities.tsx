import { IconLayers, IconCode, IconShield, IconKeyboard } from "./Icons";
import { Section } from "./Section";

const qualities = [
  {
    title: "Cohesive out of the box",
    description:
      "Unified Hyprland environment with preconfigured Waybar, Fuzzel, SwayNC, Kitty, and boot splash ready on first boot.",
    icon: IconLayers,
    badge: "Hyprland 0.55+",
  },
  {
    title: "Plain-text customization",
    description:
      "Every visual rule, animation curve, and keybinding lives in clean Lua, CSS, and INI files inside ~/.config/.",
    icon: IconCode,
    badge: "Lua & CSS",
  },
  {
    title: "Debian 13 foundation",
    description:
      "Built on Debian Trixie (x86_64) with Hyprland pinned from trixie-backports, PipeWire audio, zstd ZRAM, and an active ufw firewall.",
    icon: IconShield,
    badge: "Debian Trixie",
  },
  {
    title: "Keyboard-driven flow",
    description:
      "Fast console login via greetd and tuigreet, predictable tiling layouts, and built-in CLI utilities (flr-shot, flr-keys, flr-doctor).",
    icon: IconKeyboard,
    badge: "CLI & Keybinds",
  },
];

export function Qualities() {
  return (
    <Section
      id="qualities"
      eyebrow="Design and architecture"
      title="Engineered for focus and predictability"
      description="FluorineOS avoids complex abstractions. Everything in the user space is inspectable, editable, and backed by Debian package management."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        {qualities.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="group border-[1.5px] border-hairline bg-surface p-5 transition-colors hover:border-accent sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center border-[1.5px] border-hairline bg-canvas text-accent transition-colors group-hover:border-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="border-[1.5px] border-hairline bg-canvas px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {item.badge}
                </span>
              </div>
              <h3 className="mt-5 text-[15px] font-semibold text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-[13px] leading-[1.6] text-primary/80">
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
