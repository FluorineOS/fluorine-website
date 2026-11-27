"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconClose, IconDownload, IconGithub, IconMenu } from "./Icons";

const navLinks = [
  { id: "preview", label: "Preview" },
  { id: "qualities", label: "Qualities" },
  { id: "interface", label: "Interface" },
  { id: "keybindings", label: "Keybindings" },
  { id: "architecture", label: "Architecture" },
  { id: "install", label: "Install" },
];

// Ordered by document position. Install is nested inside the architecture
// section, so it is a normal target here: the last heading to cross the active
// line wins, and Architecture stays highlighted until Install actually reaches
// the header. Repositories closes the run, so no section pill stays highlighted
// after its heading arrives.
const scrollTargets = [
  "preview",
  "qualities",
  "interface",
  "keybindings",
  "architecture",
  "install",
  "repositories",
];

// Offset of the sticky header plus a small breathing room.
const ACTIVE_LINE = 96;

// Every entry reserves the border box in both states, so switching the pill on
// and off never changes the width, height, or baseline of the row.
const pillBase =
  "inline-flex items-center whitespace-nowrap rounded-md border-[1.5px] px-2.5 py-2 text-[13px] font-medium transition-colors xl:px-3";
const pillActive = "border-hairline bg-surface text-accent";
const pillIdle =
  "border-transparent text-muted hover:border-hairline hover:bg-surface hover:text-primary";

export function Navbar() {
  const pathname = usePathname();
  // trailingSlash is enabled, so usePathname() can return "/docs/" and the
  // comparisons below would miss. Normalize once and compare cleanly.
  const cleanPath = (pathname || "/").replace(/\/$/, "") || "/";

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Section anchors only exist on the landing page. From the documentation
  // pages they point back to the same sections on the home page.
  const onDocs = cleanPath === "/docs";
  const onChangelog = cleanPath === "/changelog";
  const onHome = cleanPath === "/";
  // Any page that is not the landing page has to point section anchors back to
  // the home route; this also covers the custom 404 and future routes.
  const offHome = !onHome;
  const sectionHref = (id: string) => `${offHome ? "/" : ""}#${id}`;

  // Section scroll-spy. The ordered target list includes nested anchors such
  // as Install, so the last heading above the active line wins.
  useEffect(() => {
    const targets = scrollTargets
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) {
      const frame = window.requestAnimationFrame(() => setActive(""));
      return () => window.cancelAnimationFrame(frame);
    }

    const update = () => {
      const line = window.scrollY + ACTIVE_LINE;
      let current = "";

      for (const target of targets) {
        const top = target.getBoundingClientRect().top + window.scrollY;

        if (top <= line) {
          current = target.id;
        }
      }

      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [cleanPath]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (id: string) => active === id;

  return (
    <header className="sticky top-0 z-50 border-b-[1.5px] border-hairline bg-canvas">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="FluorineOS home"
        >
          <Image
            src="/fluorine-logo.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <span className="font-display text-[15px]">
            <span className="text-primary">Fluorine</span>
            <span className="text-accent">OS</span>
          </span>
        </Link>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={sectionHref(link.id)}
                  aria-current={isActive(link.id) ? "true" : undefined}
                  className={`${pillBase} ${isActive(link.id) ? pillActive : pillIdle}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/docs"
                aria-current={onDocs ? "page" : undefined}
                className={`${pillBase} ${onDocs ? pillActive : pillIdle}`}
              >
                Docs
              </Link>
            </li>
            <li>
              <Link
                href="/changelog"
                aria-current={onChangelog ? "page" : undefined}
                className={`${pillBase} ${onChangelog ? pillActive : pillIdle}`}
              >
                Changelog
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/FluorineOS/fluorine"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 shrink-0 items-center gap-2 border-[1.5px] border-hairline bg-surface px-3 text-[12px] font-medium text-primary transition-colors hover:border-accent sm:inline-flex lg:hidden xl:inline-flex"
          >
            <IconGithub className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://github.com/FluorineOS/fluorine/releases/tag/v0.2.0"
            className="inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap bg-accent px-3.5 text-[12px] font-semibold text-canvas transition-colors hover:bg-accent-hover"
          >
            <IconDownload className="h-3.5 w-3.5" />
            <span>
              Download<span className="hidden sm:inline"> 0.2.0</span>
            </span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-10 w-10 items-center justify-center border-[1.5px] border-hairline bg-surface text-primary transition-colors hover:border-accent lg:hidden"
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-navigation"
          className="border-t-[1.5px] border-hairline bg-canvas lg:hidden"
        >
          <nav aria-label="Sections" className="mx-auto max-w-7xl px-5 py-2 sm:px-6">
            <ul className="flex flex-col gap-1 py-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={sectionHref(link.id)}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.id) ? "true" : undefined}
                    className={`flex w-full items-center rounded-md border-[1.5px] px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(link.id) ? pillActive : pillIdle
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/docs"
                  onClick={() => setOpen(false)}
                  aria-current={onDocs ? "page" : undefined}
                  className={`flex w-full items-center rounded-md border-[1.5px] px-3 py-2 text-sm font-medium transition-colors ${
                    onDocs ? pillActive : pillIdle
                  }`}
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/changelog"
                  onClick={() => setOpen(false)}
                  aria-current={onChangelog ? "page" : undefined}
                  className={`flex w-full items-center rounded-md border-[1.5px] px-3 py-2 text-sm font-medium transition-colors ${
                    onChangelog ? pillActive : pillIdle
                  }`}
                >
                  Changelog
                </Link>
              </li>
            </ul>
            <div className="flex flex-col gap-2 pb-4 pt-1 sm:hidden">
              <a
                href="https://github.com/FluorineOS/fluorine"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 border-[1.5px] border-hairline bg-surface px-3 py-2.5 text-xs font-medium text-primary transition-colors hover:border-accent"
              >
                <IconGithub className="h-4 w-4" />
                <span>View source on GitHub</span>
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
