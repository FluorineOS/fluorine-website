"use client";

import React, { useState } from "react";
import { IconVolume, IconWifi, IconTerminal, IconCode, IconCheck } from "./Icons";

export function WorkstationPreview() {
  const [activeTab, setActiveTab] = useState<"fastfetch" | "hyprland" | "doctor">("fastfetch");

  return (
    <div id="preview" className="w-full max-w-5xl mx-auto mt-12 mb-20 scroll-mt-24">
      {/* Outer Hyprland Tiling Frame */}
      <div
        className="w-full bg-[#000000] rounded-[6px] border border-[#1C2229] overflow-hidden"
        style={{ borderWidth: "1.5px" }}
      >
        {/* Simulated Waybar Top Panel */}
        <div
          className="w-full bg-[#0A0D10] border-b border-[#1C2229] px-4 py-1.5 flex items-center justify-between text-xs select-none"
          style={{ borderBottomWidth: "1.5px" }}
        >
          {/* Workspaces */}
          <div className="flex items-center gap-1 font-mono">
            <span className="px-2 py-0.5 text-[#6E7681]">1</span>
            <span className="px-2 py-0.5 bg-[#B4F03A] text-[#000000] font-semibold rounded-[4px]">
              2
            </span>
            <span className="px-2 py-0.5 text-[#6E7681]">3</span>
            <span className="px-2 py-0.5 text-[#6E7681]">4</span>
          </div>

          {/* Active Window Title */}
          <div className="hidden sm:flex items-center gap-2 text-[#E2E8F0] font-mono text-xs">
            <span className="text-[#6E7681]">$</span>
            <span>kitty ~ {activeTab === "fastfetch" ? "fastfetch" : activeTab === "hyprland" ? "hyprland.lua" : "flr-doctor"}</span>
          </div>

          {/* System Modules: PipeWire, Network, Clock */}
          <div className="flex items-center gap-4 text-[#E2E8F0] font-mono text-xs">
            <div className="flex items-center gap-1.5">
              <IconVolume className="w-3.5 h-3.5 text-[#B4F03A]" />
              <span>78%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconWifi className="w-3.5 h-3.5 text-[#B4F03A]" />
              <span>100%</span>
            </div>
            <div className="text-[#E2E8F0] font-semibold">14:45</div>
          </div>
        </div>

        {/* Tiled Kitty Terminal Frame */}
        <div className="bg-[#000000] p-4 sm:p-6 font-mono text-xs sm:text-sm">
          {/* Terminal Tabs Bar */}
          <div
            className="flex items-center gap-2 border-b border-[#1C2229] pb-3 mb-4"
            style={{ borderBottomWidth: "1.5px" }}
          >
            <button
              onClick={() => setActiveTab("fastfetch")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] border transition-colors ${
                activeTab === "fastfetch"
                  ? "bg-[#0A0D10] text-[#B4F03A] border-[#B4F03A]"
                  : "bg-transparent text-[#6E7681] border-[#1C2229] hover:text-[#E2E8F0] hover:border-[#6E7681]"
              }`}
              style={{ borderWidth: "1.5px" }}
            >
              <IconTerminal className="w-3.5 h-3.5" />
              <span>fastfetch</span>
            </button>

            <button
              onClick={() => setActiveTab("hyprland")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] border transition-colors ${
                activeTab === "hyprland"
                  ? "bg-[#0A0D10] text-[#B4F03A] border-[#B4F03A]"
                  : "bg-transparent text-[#6E7681] border-[#1C2229] hover:text-[#E2E8F0] hover:border-[#6E7681]"
              }`}
              style={{ borderWidth: "1.5px" }}
            >
              <IconCode className="w-3.5 h-3.5" />
              <span>hyprland.lua</span>
            </button>

            <button
              onClick={() => setActiveTab("doctor")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] border transition-colors ${
                activeTab === "doctor"
                  ? "bg-[#0A0D10] text-[#B4F03A] border-[#B4F03A]"
                  : "bg-transparent text-[#6E7681] border-[#1C2229] hover:text-[#E2E8F0] hover:border-[#6E7681]"
              }`}
              style={{ borderWidth: "1.5px" }}
            >
              <IconCheck className="w-3.5 h-3.5" />
              <span>flr-doctor</span>
            </button>

            <div className="ml-auto text-xs text-[#6E7681] hidden md:block">
              AMOLED Void Terminal: 80x24
            </div>
          </div>

          {/* Terminal Content Views */}
          <div className="min-h-[380px] overflow-x-auto leading-relaxed">
            {activeTab === "fastfetch" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start py-2">
                {/* ASCII Emblem */}
                <pre className="lg:col-span-5 text-[#B4F03A] font-mono text-xs sm:text-xs select-none">
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

                {/* System Specs */}
                <div className="lg:col-span-7 space-y-1 text-xs sm:text-sm">
                  <div className="pb-2 border-b border-[#1C2229]" style={{ borderBottomWidth: "1.5px" }}>
                    <span className="text-[#B4F03A] font-semibold">user@fluorine</span>
                    <span className="text-[#6E7681]"> ----------------------</span>
                  </div>
                  <div>
                    <span className="text-[#B4F03A]">OS: </span>
                    <span className="text-[#E2E8F0]">FluorineOS 0.0.1 x86_64</span>
                  </div>
                  <div>
                    <span className="text-[#B4F03A]">Base: </span>
                    <span className="text-[#E2E8F0]">Debian GNU/Linux 13 (trixie)</span>
                  </div>
                  <div>
                    <span className="text-[#B4F03A]">Kernel: </span>
                    <span className="text-[#E2E8F0]">Linux 6.12.9-amd64</span>
                  </div>
                  <div>
                    <span className="text-[#B4F03A]">Uptime: </span>
                    <span className="text-[#E2E8F0]">2 hours, 14 mins</span>
                  </div>
                  <div>
                    <span className="text-[#B4F03A]">Packages: </span>
                    <span className="text-[#E2E8F0]">1420 (dpkg)</span>
                  </div>
                  <div>
                    <span className="text-[#B4F03A]">Shell: </span>
                    <span className="text-[#E2E8F0]">bash 5.2.37</span>
                  </div>
                  <div>
                    <span className="text-[#B4F03A]">Display: </span>
                    <span className="text-[#E2E8F0]">3840x2160 @ 144Hz</span>
                  </div>
                  <div>
                    <span className="text-[#B4F03A]">WM: </span>
                    <span className="text-[#E2E8F0]">Hyprland 0.55.0 (Wayland)</span>
                  </div>
                  <div>
                    <span className="text-[#B4F03A]">Theme: </span>
                    <span className="text-[#E2E8F0]">AMOLED Void (#000000 / #B4F03A)</span>
                  </div>
                  <div>
                    <span className="text-[#B4F03A]">Terminal: </span>
                    <span className="text-[#E2E8F0]">kitty 0.38.0</span>
                  </div>
                  <div>
                    <span className="text-[#B4F03A]">Login: </span>
                    <span className="text-[#E2E8F0]">greetd + tuigreet</span>
                  </div>
                  <div>
                    <span className="text-[#B4F03A]">Audio: </span>
                    <span className="text-[#E2E8F0]">PipeWire 1.2.7 (WirePlumber)</span>
                  </div>
                  <div>
                    <span className="text-[#B4F03A]">Memory: </span>
                    <span className="text-[#E2E8F0]">1.84 GiB / 31.25 GiB (ZRAM zstd active)</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "hyprland" && (
              <pre className="text-xs sm:text-sm text-[#E2E8F0] font-mono leading-relaxed py-2">
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
            )}

            {activeTab === "doctor" && (
              <pre className="text-xs sm:text-sm text-[#E2E8F0] font-mono leading-relaxed py-2">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
