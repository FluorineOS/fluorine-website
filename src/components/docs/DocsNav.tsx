"use client";

import { useEffect, useState } from "react";

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

export function DocsNav() {
  const [active, setActive] = useState<string>(docGroups[0].id);

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
      const line = window.scrollY + ACTIVE_LINE;
      let current = docGroups[0].id;

      for (const target of targets) {
        const top = target.element.getBoundingClientRect().top + window.scrollY;

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

  const activeGroup =
    docGroups.find(
      (group) =>
        active === group.id || group.links.some((link) => link.id === active),
    ) ?? docGroups[0];

  return (
    <nav aria-label="Documentation sections">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        Contents
      </p>

      <ul className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:block lg:gap-0 lg:overflow-visible lg:pb-0">
        {docGroups.map((group) => {
          const isGroupActive = activeGroup.id === group.id;

          return (
            <li key={group.id} className="shrink-0 lg:shrink">
              <a
                href={`#${group.id}`}
                aria-current={isGroupActive ? "true" : undefined}
                className={`flex items-baseline gap-2 whitespace-nowrap border-l-[1.5px] py-1.5 pl-3 text-[13px] leading-[1.65] transition-colors lg:whitespace-normal ${
                  isGroupActive
                    ? "border-accent text-accent"
                    : "border-hairline text-muted hover:border-muted hover:text-primary"
                }`}
              >
                <span className="font-mono text-[10px] tracking-[0.14em]">
                  {group.index}
                </span>
                <span>{group.label}</span>
              </a>

              <ul className="hidden lg:mt-1 lg:block lg:pb-3">
                {group.links.map((link) => {
                  const isActive = active === link.id;

                  return (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        aria-current={isActive ? "true" : undefined}
                        className={`block border-l-[1.5px] py-1 pl-5 text-[12.5px] leading-[1.65] transition-colors ${
                          isActive
                            ? "border-accent text-accent"
                            : "border-hairline text-muted hover:text-primary"
                        }`}
                      >
                        {link.label}
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
