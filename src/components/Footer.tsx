import React from "react";
import Link from "next/link";
import { HexEmblem } from "./Icons";

export function Footer() {
  return (
    <footer
      className="w-full bg-[#000000] border-t border-[#1C2229] py-12 px-4 sm:px-6 lg:px-8 mt-auto"
      style={{ borderTopWidth: "1.5px" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <HexEmblem className="w-6 h-6" />
          <span className="text-xs font-mono text-[#6E7681]">
            FluorineOS - Open-source Debian 13 + Hyprland distribution
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#6E7681]">
          <Link
            href="https://github.com/FluorineOS/fluorine"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E2E8F0] transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://github.com/FluorineOS/fluorine/releases/latest"
            className="hover:text-[#E2E8F0] transition-colors"
          >
            Releases
          </Link>
          <Link
            href="https://fluorineos.github.io/apt-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E2E8F0] transition-colors"
          >
            APT Repository
          </Link>
          <Link
            href="https://github.com/FluorineOS/fluorine/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E2E8F0] transition-colors"
          >
            Issues
          </Link>
        </div>
      </div>
    </footer>
  );
}
