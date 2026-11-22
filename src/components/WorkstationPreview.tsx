"use client";

import React, { useState } from "react";
import { IconVolume, IconWifi, IconTerminal, IconCode, IconCheck } from "./Icons";

const tabs = [
  { id: "fastfetch", label: "fastfetch", icon: IconTerminal },
  { id: "hyprland", label: "hyprland.lua", icon: IconCode },
  { id: "doctor", label: "flr-doctor", icon: IconCheck },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function WorkstationPreview() {
  const [activeTab, setActiveTab] = useState<TabId>("fastfetch");

  const focusTab = (next: TabId) => {
    setActiveTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((tab) => tab.id === activeTab);

    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusTab(tabs[(index + 1) % tabs.length].id);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusTab(tabs[(index - 1 + tabs.length) % tabs.length].id);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTab(tabs[0].id);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTab(tabs[tabs.length - 1].id);
    }
  };

  return (
    <div id="preview" className="mx-auto mt-14 max-w-5xl scroll-mt-20 sm:mt-20">
      <div className="border-[1.5px] border-hairline bg-canvas">
        <div className="flex items-center justify-between gap-3 border-b-[1.5px] border-hairline bg-surface px-3 py-1.5 text-[11px] select-none sm:px-4">
          <div className="flex items-center gap-1 font-mono">
            <span className="px-1.5 py-0.5 text-muted">1</span>
            <span className="bg-accent px-1.5 py-0.5 font-semibold text-canvas">
              2
            </span>
            <span className="px-1.5 py-0.5 text-muted">3</span>
            <span className="px-1.5 py-0.5 text-muted">4</span>
          </div>

          <div className="hidden items-center gap-2 font-mono text-[11px] text-primary sm:flex">
            <span className="text-muted">$</span>
            <span>
              kitty ~{" "}
              {activeTab === "fastfetch"
                ? "fastfetch"
                : activeTab === "hyprland"
                  ? "hyprland.lua"
                  : "flr-doctor"}
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-primary sm:gap-4">
            <div className="flex items-center gap-1.5">
              <IconVolume className="h-3.5 w-3.5 text-accent" />
              <span>78%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconWifi className="h-3.5 w-3.5 text-accent" />
              <span>100%</span>
            </div>
            <div className="font-semibold">14:45</div>
          </div>
        </div>

        <div className="p-4 font-mono text-[11px] sm:p-6 sm:text-xs">
          <div
            role="tablist"
            aria-label="Workstation preview panels"
            onKeyDown={handleKeyDown}
            className="-mx-1 flex items-center gap-2 overflow-x-auto border-b-[1.5px] border-hairline px-1 pb-3"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="workstation-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex shrink-0 items-center gap-2 border-[1.5px] px-3 py-1.5 transition-colors ${
                    isActive
                      ? "border-accent bg-surface text-accent"
                      : "border-hairline bg-transparent text-muted hover:text-primary"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <div className="ml-auto hidden shrink-0 text-[11px] text-muted md:block">
              AMOLED Void Terminal: 80x24
            </div>
          </div>

          <div
            id="workstation-panel"
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
            className="min-h-[380px] overflow-x-auto pt-4 leading-[1.65]"
          >
            {activeTab === "fastfetch" ? (
              <div className="grid grid-cols-1 items-start gap-6 py-2 lg:grid-cols-12">
                <pre className="text-[10px] text-accent select-none sm:text-xs lg:col-span-5">
{`  _____ _                _
 |  ___| |_   _  ___  _ __(_)_ __
 | |_  | | | | |/ _ \\| '__| | '_ \\
 |  _| | | |_| | (_) | |  | | | | |
 |_|   |_|\\__,_|\\___/|_|  |_|_| |_|

       ___  ____
      / _ \\/ ___|
     | | | \\___ \\
     | |_| |___) |
      \\___/|____/`}
                </pre>

                <dl className="space-y-1 lg:col-span-7">
                  <div className="border-b-[1.5px] border-hairline pb-2">
                    <dt className="inline font-semibold text-accent">
                      user@fluorine
                    </dt>
                    <dd className="inline text-muted"> ----------------------</dd>
                  </div>
                  {[
                    ["OS", "FluorineOS 0.0.1 x86_64"],
                    ["Base", "Debian GNU/Linux 13 (trixie)"],
                    ["Kernel", "Linux 6.12.9-amd64"],
                    ["Uptime", "2 hours, 14 mins"],
                    ["Packages", "1420 (dpkg)"],
                    ["Shell", "bash 5.2.37"],
                    ["Display", "3840x2160 @ 144Hz"],
                    ["WM", "Hyprland 0.55.0 (Wayland)"],
                    ["Theme", "AMOLED Void (#000000 / #B4F03A)"],
                    ["Terminal", "kitty 0.38.0"],
                    ["Login", "greetd + tuigreet"],
                    ["Audio", "PipeWire 1.2.7 (WirePlumber)"],
                    ["Memory", "1.84 GiB / 31.25 GiB (ZRAM zstd active)"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex gap-1">
                      <dt className="shrink-0 text-accent">{label}: </dt>
                      <dd className="text-primary">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            {activeTab === "hyprland" ? (
              <pre className="py-2 text-[11px] text-primary sm:text-xs">
                <code>
{`-- ~/.config/hypr/hyprland.lua
-- FluorineOS native Lua compositor configuration

hl.config({
  general = {
    border_size = 2,
    gaps_in = 4,
    gaps_out = 8,
    col = {
      active_border = { colors = { "rgba(b4f03aff)" } },
      inactive_border = "rgba(1c2229ff)",
    },
  },
  decoration = {
    rounding = 0,
    active_opacity = 1.0,
    inactive_opacity = 1.0,
    shadow = { enabled = false },
  },
  misc = {
    disable_hyprland_logo = true,
    disable_splash_rendering = true,
    vrr = 1,
  },
})

-- Exponential ease-out curve without overshoot
hl.curve("fluorineEaseOut", { type = "bezier", points = { {0.16, 1.0}, {0.3, 1.0} } })
hl.animation({ leaf = "global", enabled = true, speed = 5.0, bezier = "fluorineEaseOut" })

-- Session Keybindings
hl.bind("SUPER + Return", hl.dsp.exec_cmd("kitty"))
hl.bind("SUPER + D",      hl.dsp.exec_cmd("fuzzel"))
hl.bind("SUPER + Q",      hl.dsp.window.close())
hl.bind("SUPER + V",      hl.dsp.window.float({ action = "toggle" }))
hl.bind("SUPER + F",      hl.dsp.window.fullscreen({ action = "toggle" }))`}
                </code>
              </pre>
            ) : null}

            {activeTab === "doctor" ? (
              <pre className="py-2 text-[11px] text-primary sm:text-xs">
                <code>
{`$ flr-doctor

FluorineOS
------------------------------------------------------------
  Version                        0.0.1
  Distribution                   FluorineOS 0.0.1 (trixie)
  Base                           trixie

Session
------------------------------------------------------------
  XDG_SESSION_TYPE               wayland
  XDG_CURRENT_DESKTOP            Hyprland
  HYPRLAND_INSTANCE_SIGNATURE    hyprland-session-active
  Hyprland                       v0.55.0

Portals
------------------------------------------------------------
  xdg-desktop-portal-hyprland    active

Audio
------------------------------------------------------------
  pipewire                       active
  wireplumber                    active

Renderer
------------------------------------------------------------
  OpenGL / EGL                   Mesa DRI Intel(R) UHD Graphics (ADL-S GT1)

All diagnostic health checks passed.`}
                </code>
              </pre>
            ) : null}
          </div>
        </div>
      </div>

      <p className="mt-3 text-center font-mono text-[11px] text-muted">
        Simulated preview of the default Hyprland session.
      </p>
    </div>
  );
}
