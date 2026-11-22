import React from "react";
import Link from "next/link";
import { HexEmblem, IconGithub, IconDownload } from "./Icons";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#000000] border-b border-[#1C2229]" style={{ borderWidth: "0 0 1.5px 0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <HexEmblem className="w-8 h-8 transition-transform group-hover:scale-105" />
          <span className="font-semibold text-lg tracking-tight">
            <span className="text-[#E2E8F0]">Fluorine</span>
            <span className="text-[#B4F03A]">OS</span>
          </span>
        </Link>

        {/* Center section links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6E7681]">
          <Link
            href="#qualities"
            className="transition-colors hover:text-[#E2E8F0]"
          >
            Qualities
          </Link>
          <Link
            href="#preview"
            className="transition-colors hover:text-[#E2E8F0]"
          >
            Preview
          </Link>
          <Link
            href="#architecture"
            className="transition-colors hover:text-[#E2E8F0]"
          >
            Architecture
          </Link>
          <Link
            href="#keybindings"
            className="transition-colors hover:text-[#E2E8F0]"
          >
            Keybindings
          </Link>
          <Link
            href="#install"
            className="transition-colors hover:text-[#E2E8F0]"
          >
            Install
          </Link>
        </nav>

        {/* Right CTA links */}
        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/FluorineOS/fluorine"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#E2E8F0] bg-[#0A0D10] border border-[#1C2229] rounded-[6px] hover:border-[#B4F03A] transition-colors"
            style={{ borderWidth: "1.5px" }}
          >
            <IconGithub className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </Link>
          <Link
            href="https://github.com/FluorineOS/fluorine/releases/latest"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-[#000000] bg-[#B4F03A] hover:bg-[#C6F75E] rounded-[6px] transition-colors"
          >
            <IconDownload className="w-3.5 h-3.5 stroke-[2]" />
            <span>Download 0.0.1</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
