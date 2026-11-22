import React from "react";
import Link from "next/link";
import { IconExternal } from "./Icons";

const repos = [
  {
    name: "fluorine",
    url: "https://github.com/FluorineOS/fluorine",
    desc: "Primary ISO assembly tree, live-build hooks, Calamares overrides, and build automation.",
    type: "ISO / Monorepo",
  },
  {
    name: "fluorine-desktop",
    url: "https://github.com/FluorineOS/fluorine-desktop",
    desc: "Hyprland 0.55 Lua configuration, Waybar, Kitty, Fuzzel, SwayNC, and flr-* CLI utilities.",
    type: "Debian Package",
  },
  {
    name: "fluorine-artwork",
    url: "https://github.com/FluorineOS/fluorine-artwork",
    desc: "3840x2160 AMOLED SVG wallpapers, Plymouth boot splash, fastfetch branding, and assets.",
    type: "Debian Package",
  },
  {
    name: "fluorine-keyring",
    url: "https://github.com/FluorineOS/fluorine-keyring",
    desc: "Archive signing key and deb822 sources configuration for APT repository verification.",
    type: "Debian Package",
  },
  {
    name: "apt-repo",
    url: "https://github.com/FluorineOS/apt-repo",
    desc: "Signed reprepro Debian package archive published through GitHub Pages.",
    type: "APT Archive",
  },
];

export function Repositories() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1C2229]" style={{ borderTopWidth: "1.5px" }}>
      <div className="mb-12">
        <h2 className="text-xs uppercase tracking-wider font-semibold text-[#B4F03A] mb-3">
          Ecosystem
        </h2>
        <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E2E8F0]">
          Organization Repositories
        </p>
        <p className="mt-3 text-sm text-[#6E7681] max-w-2xl leading-relaxed">
          FluorineOS is developed as a collection of modular repositories under the
          FluorineOS GitHub organization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo, idx) => (
          <Link
            key={idx}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-[#0A0D10] rounded-[6px] border border-[#1C2229] hover:border-[#B4F03A] transition-colors flex flex-col justify-between group"
            style={{ borderWidth: "1.5px" }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-semibold text-[#E2E8F0] group-hover:text-[#B4F03A] transition-colors">
                  FluorineOS/{repo.name}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-[4px] bg-[#000000] border border-[#1C2229] text-[#6E7681]">
                  {repo.type}
                </span>
              </div>
              <p className="text-xs text-[#6E7681] leading-relaxed">
                {repo.desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1C2229] flex items-center justify-between text-xs text-[#6E7681]" style={{ borderTopWidth: "1.5px" }}>
              <span>View source</span>
              <IconExternal className="w-3.5 h-3.5 text-[#6E7681] group-hover:text-[#B4F03A] transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
