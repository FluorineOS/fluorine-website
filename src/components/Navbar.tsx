"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconClose, IconDownload, IconGithub, IconMenu } from "./Icons";

const navLinks = [
  { id: "preview", label: "Preview" },
  { id: "qualities", label: "Qualities" },
  { id: "keybindings", label: "Keybindings" },
  { id: "architecture", label: "Architecture" },
  { id: "install", label: "Install" },
];

// The install anchor lives inside the architecture section, so it is not a
// scroll target of its own. Observing it made the section highlight flip to
// "Install" as soon as the architecture section reached the viewport.
const scrollTargets = ["preview", "qualities", "keybindings", "architecture"];

// Offset of the sticky header plus a small breathing room.
const ACTIVE_LINE = 96;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Section anchors only exist on the landing page. From the documentation
  // pages they point back to the same sections on the home page.
  const onDocs = pathname.startsWith("/docs");
  const onChangelog = pathname.startsWith("/changelog");
  const offHome = onDocs || onChangelog;
  const sectionHref = (id: string) => `${offHome ? "/" : ""}#${id}`;

  useEffect(() => {
    const targets = scrollTargets
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) {
      return;
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
  }, []);

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

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = active === link.id;

              return (
                <li key={link.id}>
                  <a
                    href={sectionHref(link.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block py-2 text-[13px] font-medium transition-colors ${
                      isActive
                        ? "text-accent"
                        : "text-muted hover:text-primary"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-px h-[1.5px] transition-colors ${
                        isActive ? "bg-accent" : "bg-transparent"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
            <li>
              <Link
                href="/docs"
                aria-current={onDocs ? "page" : undefined}
                className={`relative block py-2 text-[13px] font-medium transition-colors ${
                  onDocs ? "text-accent" : "text-muted hover:text-primary"
                }`}
              >
                Docs
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-px h-[1.5px] transition-colors ${
                    onDocs ? "bg-accent" : "bg-transparent"
                  }`}
                />
              </Link>
            </li>
            <li>
              <Link
                href="/changelog"
                aria-current={onChangelog ? "page" : undefined}
                className={`relative block py-2 text-[13px] font-medium transition-colors ${
                  onChangelog ? "text-accent" : "text-muted hover:text-primary"
                }`}
              >
                Changelog
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-px h-[1.5px] transition-colors ${
                    onChangelog ? "bg-accent" : "bg-transparent"
                  }`}
                />
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/FluorineOS/fluorine"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 border-[1.5px] border-hairline bg-surface px-3 py-2 text-[12px] font-medium text-primary transition-colors hover:border-accent sm:inline-flex"
          >
            <IconGithub className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://github.com/FluorineOS/fluorine/releases/tag/v0.2.0"
            className="inline-flex items-center gap-2 bg-accent px-3.5 py-2 text-[12px] font-semibold text-canvas transition-colors hover:bg-accent-hover"
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
            className="flex h-10 w-10 items-center justify-center border-[1.5px] border-hairline bg-surface text-primary transition-colors hover:border-accent md:hidden"
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-navigation"
          className="border-t-[1.5px] border-hairline bg-canvas md:hidden"
        >
          <nav aria-label="Sections" className="mx-auto max-w-7xl px-5 py-2 sm:px-6">
            <ul className="[&>li+li]:border-t-[1.5px] [&>li+li]:border-hairline">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={sectionHref(link.id)}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm font-medium text-primary transition-colors hover:text-accent"
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
                  className={`block py-3 text-sm font-medium transition-colors hover:text-accent ${
                    onDocs ? "text-accent" : "text-primary"
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
                  className={`block py-3 text-sm font-medium transition-colors hover:text-accent ${
                    onChangelog ? "text-accent" : "text-primary"
                  }`}
                >
                  Changelog
                </Link>
              </li>
            </ul>
            <div className="flex flex-col gap-2 pb-4 pt-3 sm:hidden">
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
