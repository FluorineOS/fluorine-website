import React from "react";
import Link from "next/link";
import { IconDownload, IconExternal } from "./Icons";
import { WorkstationPreview } from "./WorkstationPreview";

export function Hero() {
  return (
    <section className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      {/* Version Pill */}
      <div
        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-[6px] bg-[#0A0D10] border border-[#1C2229] mb-8 text-xs font-mono text-[#E2E8F0]"
        style={{ borderWidth: "1.5px" }}
      >
        <span className="w-2 h-2 rounded-full bg-[#B4F03A]" />
        <span>Release 0.0.1 - Debian 13 (Trixie) + Hyprland 0.55+</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#E2E8F0] max-w-4xl">
        A clean, customizable Wayland workstation.
      </h1>

      {/* Subheadline */}
      <p className="mt-6 text-base sm:text-lg text-[#6E7681] max-w-2xl leading-relaxed">
        Built on Debian 13 and Hyprland. Cohesive out of the box, configured in
        readable plain text, and engineered for focused daily development.
      </p>

      {/* Call to Actions */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="https://github.com/FluorineOS/fluorine/releases/latest"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#000000] bg-[#B4F03A] hover:bg-[#C6F75E] rounded-[6px] transition-colors"
        >
          <IconDownload className="w-4 h-4 stroke-[2]" />
          <span>Download ISO (0.0.1)</span>
        </Link>

        <Link
          href="https://github.com/FluorineOS/fluorine"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#E2E8F0] bg-[#0A0D10] border border-[#1C2229] rounded-[6px] hover:border-[#B4F03A] transition-colors"
          style={{ borderWidth: "1.5px" }}
        >
          <span>Explore Source</span>
          <IconExternal className="w-4 h-4 text-[#6E7681]" />
        </Link>
      </div>

      {/* Interactive Workstation Preview */}
      <WorkstationPreview />
    </section>
  );
}
