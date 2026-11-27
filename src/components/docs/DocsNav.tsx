"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface DocLink {
  id: string;
  label: string;
}

interface DocGroup {
  id: string;
  label: string;
  index: string;
  links: DocLink[];
}

export const docGroups: DocGroup[] = [
  {
    id: "installation",
    label: "Installation",
    index: "01",
    links: [
      { id: "requirements", label: "Requirements" },
      { id: "verify-image", label: "Verify the image" },
      { id: "write-media", label: "Write the media" },
      { id: "firmware", label: "Firmware" },
      { id: "installer", label: "Installer" },
    ],
  },
  {
    id: "desktop",
    label: "Desktop and workflow",
    index: "02",
    links: [
      { id: "login", label: "Login" },
      { id: "workspaces", label: "Workspaces" },
      { id: "keybindings", label: "Keybindings" },
      { id: "clipboard-screenshots", label: "Clipboard and screenshots" },
      { id: "locking", label: "Locking and idle" },
    ],
  },
  {
    id: "customization",
    label: "Customization",
    index: "03",
    links: [
      { id: "config-map", label: "Configuration map" },
      { id: "monitors", label: "Monitors and scaling" },
      { id: "gaps-borders", label: "Gaps and borders" },
      { id: "custom-binds", label: "Custom keybindings" },
    ],
  },
  {
    id: "diagnostics",
    label: "Diagnostics and recovery",
    index: "04",
    links: [
      { id: "flr-doctor", label: "flr-doctor" },
      { id: "tty", label: "Switch to a TTY" },
      { id: "safe-graphics", label: "Safe Graphics" },
      { id: "updates", label: "Package updates" },
    ],
  },
];

// Offset of the sticky header plus breathing room, matching the landing page.
const ACTIVE_LINE = 96;

// A sidebar click scrolls smoothly through every heading on the way to its
// target. The observer stays quiet for this long so the pill does not flicker
// onto the intermediate sections while the page is moving.
const CLICK_LOCK_MS = 650;

const firstSection = docGroups[0].id;

const linkBase =
  "flex w-full items-center justify-between px-3 py-2 rounded-md border-[1.5px] transition-colors";
const linkActive = "border-hairline bg-surface text-accent";
const linkIdle =
  "border-transparent text-muted hover:border-hairline hover:bg-surface hover:text-primary";

const knownIds = new Set(
  docGroups.flatMap((group) => [
    group.id,
    ...group.links.map((link) => link.id),
  ]),
);

function indicator() {
  return (
    <span
      aria-hidden="true"
      className="h-1.5 w-1.5 shrink-0 bg-accent"
    />
  );
}

export function DocsNav() {
  const [activeSection, setActiveSection] = useState<string>(firstSection);
  const isClickScrollingRef = useRef(false);
  const lockTimerRef = useRef<number | null>(null);

  // Start from the deep link when the page is opened with a hash. The read is
  // deferred one frame so the initial paint uses the server-rendered entry and
  // the hash only corrects it after hydration.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const fromHash = window.location.hash.replace(/^#/, "");

      if (fromHash && knownIds.has(fromHash)) {
        setActiveSection(fromHash);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Scroll-spy: the observer only fires when a target crosses the sticky
  // header line, and the exact active entry is recomputed from the document,
  // so the highlight matches the geometry the user actually sees.
  useEffect(() => {
    const targets = docGroups
      .flatMap((group) => [
        { id: group.id, element: document.getElementById(group.id) },
        ...group.links.map((link) => ({
          id: link.id,
          element: document.getElementById(link.id),
        })),
      ])
      .filter(
        (entry): entry is { id: string; element: HTMLElement } =>
          entry.element !== null,
      );

    if (targets.length === 0) {
      return;
    }

    const update = () => {
      if (isClickScrollingRef.current) {
        return;
      }

      const line = window.scrollY + ACTIVE_LINE;
      let current = firstSection;

      for (const target of targets) {
        const top = target.element.getBoundingClientRect().top + window.scrollY;

        if (top <= line) {
          current = target.id;
        }
      }

      setActiveSection((previous) => (previous === current ? previous : current));
    };

    update();

    const observer = new IntersectionObserver(update, {
      rootMargin: `-${ACTIVE_LINE}px 0px -60% 0px`,
      threshold: 0,
    });

    for (const target of targets) {
      observer.observe(target.element);
    }

    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(
    () => () => {
      if (lockTimerRef.current !== null) {
        window.clearTimeout(lockTimerRef.current);
      }
    },
    [],
  );

  const handleClick = useCallback((id: string) => {
    setActiveSection(id);
    isClickScrollingRef.current = true;

    if (lockTimerRef.current !== null) {
      window.clearTimeout(lockTimerRef.current);
    }

    lockTimerRef.current = window.setTimeout(() => {
      isClickScrollingRef.current = false;
      lockTimerRef.current = null;
    }, CLICK_LOCK_MS);
  }, []);

  return (
    <nav aria-label="Documentation sections">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        Contents
      </p>

      <ul className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
        {docGroups.map((group) => {
          const isGroupActive = activeSection === group.id;

          return (
            <li key={group.id} className="shrink-0 lg:shrink">
              <a
                href={`#${group.id}`}
                onClick={() => handleClick(group.id)}
                aria-current={isGroupActive ? "true" : undefined}
                className={`flex w-auto items-center justify-between gap-2 whitespace-nowrap rounded-md border-[1.5px] px-3 py-2 text-[13px] leading-[1.65] transition-colors lg:w-full lg:whitespace-normal ${
                  isGroupActive ? linkActive : linkIdle
                }`}
              >
                <span className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] tracking-[0.14em]">
                    {group.index}
                  </span>
                  <span>{group.label}</span>
                </span>
                {isGroupActive ? indicator() : null}
              </a>

              <ul className="hidden lg:mt-1 lg:block lg:space-y-1 lg:pb-2">
                {group.links.map((link) => {
                  const isActive = activeSection === link.id;

                  return (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        onClick={() => handleClick(link.id)}
                        aria-current={isActive ? "true" : undefined}
                        className={`${linkBase} text-[12.5px] leading-[1.65] ${
                          isActive ? linkActive : linkIdle
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive ? indicator() : null}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
