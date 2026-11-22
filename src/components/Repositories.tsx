import Link from "next/link";
import { IconExternal } from "./Icons";
import { Section } from "./Section";

const repos = [
  {
    name: "fluorine",
    url: "https://github.com/FluorineOS/fluorine",
    desc: "Primary ISO assembly tree, live-build hooks, Calamares overrides, and build automation.",
    type: "ISO / Monorepo",
    featured: true,
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
    <Section
      id="repositories"
      eyebrow="Ecosystem"
      title="Organization repositories"
      description="FluorineOS is developed as a collection of modular repositories under the FluorineOS GitHub organization."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <Link
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex flex-col justify-between border-[1.5px] border-hairline bg-surface p-5 transition-colors hover:border-accent ${
              repo.featured ? "lg:col-span-2" : ""
            }`}
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className={`font-mono font-semibold text-primary transition-colors group-hover:text-accent ${
                    repo.featured ? "text-[13px]" : "text-xs"
                  }`}
                >
                  FluorineOS/{repo.name}
                </span>
                <span className="border-[1.5px] border-hairline bg-canvas px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {repo.type}
                </span>
              </div>
              <p
                className={`mt-3 leading-[1.6] text-primary/80 ${
                  repo.featured ? "text-[13px] sm:text-sm" : "text-[13px]"
                }`}
              >
                {repo.desc}
              </p>
            </div>
            <div className="mt-5 flex items-center justify-between border-t-[1.5px] border-hairline pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              <span>View source</span>
              <IconExternal className="h-3.5 w-3.5 transition-colors group-hover:text-accent" />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
