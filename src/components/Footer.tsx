import Image from "next/image";
import Link from "next/link";
import { IconArrowUp } from "./Icons";

const links = [
  { label: "GitHub", href: "https://github.com/FluorineOS/fluorine" },
  { label: "Releases", href: "https://github.com/FluorineOS/fluorine/releases/latest" },
  { label: "APT repository", href: "https://fluorineos.github.io/apt-repo" },
  { label: "Issues", href: "https://github.com/FluorineOS/fluorine/issues" },
];

export function Footer() {
  return (
    <footer className="border-t-[1.5px] border-hairline bg-canvas">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/fluorine-logo.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="text-sm font-semibold tracking-tight">
                <span className="text-primary">Fluorine</span>
                <span className="text-accent">OS</span>
              </span>
            </Link>
            <p className="mt-3 text-[13px] leading-[1.6] text-muted">
              A Debian 13 and Hyprland Wayland workstation. Cohesive out of the
              box, configured in readable plain text.
            </p>
          </div>

          <nav aria-label="Project links">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t-[1.5px] border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Part of the FluorineOS project
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
          >
            <IconArrowUp className="h-3.5 w-3.5" />
            <span>Back to top</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
