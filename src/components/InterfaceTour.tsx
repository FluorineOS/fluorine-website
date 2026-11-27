"use client";

import { useState } from "react";
import { Section } from "./Section";

interface TourShot {
  id: string;
  tab: string;
  shortcut: string;
  src: string;
  alt: string;
  caption: string;
}

const shots: TourShot[] = [
  {
    id: "desktop-grid",
    tab: "Desktop",
    shortcut: "Tiled Kitty and Waybar",
    src: "/screenshots/desktop-grid.png",
    alt: "Two tiled Kitty terminal windows on the FluorineOS desktop with the Waybar status bar along the top edge.",
    caption:
      "Two tiled Kitty windows. fastfetch reports the kernel, compositor, and package versions on the left; flr-doctor lists its session checks on the right. Waybar runs along the top edge.",
  },
  {
    id: "control-menu",
    tab: "Control menu",
    shortcut: "SUPER + Escape",
    src: "/screenshots/control-menu.png",
    alt: "Fuzzel command menu opened over the desktop listing the flr-ctl helper commands.",
    caption:
      "flr-ctl opens a Fuzzel command menu over the desktop and lists the flr-* helpers with the shortcut that runs each one.",
  },
  {
    id: "wallpaper-switcher",
    tab: "Wallpapers",
    shortcut: "SUPER + W",
    src: "/screenshots/wallpaper-switcher.png",
    alt: "The flr-wall picker listing the packaged wallpapers over the fluorine-topo wallpaper.",
    caption:
      "flr-wall lists the four packaged 3840x2160 wallpapers. The selection is written to the session state and applied to swaybg, and hyprlock picks up the same path.",
  },
  {
    id: "lockscreen",
    tab: "Lock screen",
    shortcut: "SUPER + L",
    src: "/screenshots/lockscreen.png",
    alt: "hyprlock lock screen showing the current wallpaper, clock, and password field.",
    caption:
      "hyprlock draws over the current wallpaper with the clock, session state, and a bordered password field that focuses in lime.",
  },
];

export function InterfaceTour() {
  const [activeId, setActiveId] = useState(shots[0].id);
  const active = shots.find((shot) => shot.id === activeId) ?? shots[0];

  const select = (index: number) => {
    setActiveId(shots[index].id);
    document.getElementById(`tour-tab-${shots[index].id}`)?.focus();
  };

  const step = (direction: 1 | -1) => {
    const index = shots.findIndex((shot) => shot.id === activeId);
    select((index + direction + shots.length) % shots.length);
  };

  return (
    <Section
      id="interface"
      eyebrow="Interface tour"
      title="The running desktop"
      description="Frames captured from the live image at 1920x1080 in UEFI QEMU. Every panel, border, and accent is the shipped configuration, not a mockup."
    >
      <div
        role="tablist"
        aria-label="Desktop screenshots"
        className="flex flex-wrap gap-2"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          } else if (event.key === "Home") {
            event.preventDefault();
            select(0);
          } else if (event.key === "End") {
            event.preventDefault();
            select(shots.length - 1);
          }
        }}
      >
        {shots.map((shot) => {
          const selected = shot.id === activeId;

          return (
            <button
              key={shot.id}
              id={`tour-tab-${shot.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="tour-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(shot.id)}
              className={`border-[1.5px] px-3 py-2 text-left transition-colors ${
                selected
                  ? "border-accent bg-canvas"
                  : "border-hairline bg-surface hover:border-accent"
              }`}
            >
              <span
                className={`block text-[12px] font-semibold ${
                  selected ? "text-accent" : "text-primary"
                }`}
              >
                {shot.tab}
              </span>
              <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                {shot.shortcut}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="tour-panel"
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`tour-tab-${active.id}`}
        className="mt-4"
      >
        <div className="border-[1.5px] border-hairline bg-surface p-2 sm:p-3">
          {/* The gallery ships the captured framebuffer exactly as rendered. This
              page is a static export, so next/image would only add an optimizer
              that cannot run; the element stays a plain img. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={active.id}
            src={active.src}
            alt={active.alt}
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full border-[1.5px] border-hairline"
          />
        </div>
        <p className="mt-4 max-w-3xl text-[13px] leading-[1.6] text-primary/80">
          {active.caption}
        </p>
      </div>
    </Section>
  );
}
