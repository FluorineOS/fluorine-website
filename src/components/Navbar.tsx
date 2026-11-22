"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconClose, IconDownload, IconGithub, IconMenu } from "./Icons";

const navLinks = [
  { id: "preview", label: "Preview" },
  { id: "qualities", label: "Qualities" },
  { id: "keybindings", label: "Keybindings" },
  { id: "architecture", label: "Architecture" },
  { id: "install", label: "Install" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-88px 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
          <span className="text-[15px] font-semibold tracking-tight">
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
                    href={`#${link.id}`}
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
            href="https://github.com/FluorineOS/fluorine/releases/latest"
            className="inline-flex items-center gap-2 bg-accent px-3.5 py-2 text-[12px] font-semibold text-canvas transition-colors hover:bg-accent-hover"
          >
            <IconDownload className="h-3.5 w-3.5" />
            <span>
              Download<span className="hidden sm:inline"> 0.0.1</span>
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
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm font-medium text-primary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
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
