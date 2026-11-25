"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

type DemoId = "ctl" | "mode" | "doctor" | "snapshot";
type ModeName = "WORK" | "FOCUS" | "PRESENT";

const demos: {
  id: DemoId;
  keys: string[];
  label: string;
  command: string;
  description: string;
}[] = [
  {
    id: "ctl",
    keys: ["SUPER", "Escape"],
    label: "System menu",
    command: "flr-ctl",
    description: "Fuzzel menu with every hardware and session action.",
  },
  {
    id: "mode",
    keys: ["SUPER", "M"],
    label: "Workstation mode",
    command: "flr-mode",
    description: "Switch the gaps, borders, and bar between three profiles.",
  },
  {
    id: "doctor",
    keys: ["D"],
    label: "Diagnostics",
    command: "flr-doctor",
    description: "Session, package, storage, and service health report.",
  },
  {
    id: "snapshot",
    keys: ["S"],
    label: "Snapshots",
    command: "flr-snapshot",
    description: "Record the root subvolume before an upgrade.",
  },
];

const ctlEntries = [
  "Network Settings",
  "Bluetooth Devices",
  "Display Layout",
  "Audio Mixer",
  "Power Profile (PWR BAL)",
  "Keybinding Cheatsheet",
  "System Diagnostics",
  "Snapshots",
  "Workstation Mode",
  "Lock Session",
  "Suspend",
  "Reboot",
  "Shut Down",
];

const doctorLines = [
  { tone: "ok", scope: "session", text: "Hyprland 0.55 on Wayland, native Lua config loaded" },
  { tone: "ok", scope: "packages", text: "fluorine-desktop 0.5.0 is current in trixie" },
  { tone: "ok", scope: "archive", text: "apt-repo trixie signature verified" },
  { tone: "ok", scope: "storage", text: "btrfs root on @, snapper root config active" },
  { tone: "info", scope: "firmware", text: "intel-microcode and firmware-iwlwifi present" },
  { tone: "ok", scope: "network", text: "NetworkManager connected, DNS resolving" },
  { tone: "ok", scope: "services", text: "greetd, hypridle, waybar, swaync running" },
  { tone: "ok", scope: "result", text: "no blocking issues found" },
];

const snapshotSteps = [
  { text: "$ flr-snapshot create pre-update", tone: "cmd" },
  { text: "Snapshot 12 created: pre-update", tone: "ok" },
  { text: "GRUB menu not refreshed: no snapshot menu generator is installed.", tone: "muted" },
  { text: "$ flr-snapshot list", tone: "cmd" },
  { text: "ID    TIMESTAMP                   DESCRIPTION", tone: "muted" },
  { text: "12    Tue 24 Nov 2026 23:41:07   pre-update", tone: "row" },
  { text: "11    Tue 24 Nov 2026 22:10:44   pre-update", tone: "row" },
  { text: "Rollback ready: flr-snapshot rollback 12", tone: "accent" },
];

const modes: {
  name: ModeName;
  gaps: number;
  border: number;
  inactiveOpacity: number;
  summary: string;
}[] = [
  {
    name: "WORK",
    gaps: 8,
    border: 2,
    inactiveOpacity: 1,
    summary: "Gaps 4/6, border 2px, Waybar visible, notifications on.",
  },
  {
    name: "FOCUS",
    gaps: 0,
    border: 1,
    inactiveOpacity: 0.85,
    summary: "No gaps, border 1px, Waybar hidden, do not disturb on.",
  },
  {
    name: "PRESENT",
    gaps: 18,
    border: 2,
    inactiveOpacity: 1,
    summary: "Outer gaps 14, full contrast, idle lock stopped, do not disturb on.",
  },
];

type OutputLine = { text: string; tone: string; prefix?: string };

const doctorOutput: OutputLine[] = doctorLines.map((line) => ({
  tone: line.tone,
  prefix: `[${line.tone}] ${line.scope.padEnd(10, " ")}`,
  text: line.text,
}));

function toneClass(tone: string) {
  switch (tone) {
    case "ok":
    case "accent":
      return "text-accent";
    case "info":
      return "text-warning";
    case "cmd":
    case "row":
      return "text-primary";
    default:
      return "text-muted";
  }
}

// Types the lines out while mounted. Remounting through a key resets the
// animation, which keeps the reset out of an effect body.
function TypedOutput({ lines, speed }: { lines: OutputLine[]; speed: number }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setShown((value) => {
        if (value >= lines.length) {
          window.clearInterval(timer);
          return value;
        }
        return value + 1;
      });
    }, speed);

    return () => window.clearInterval(timer);
  }, [lines.length, speed]);

  return (
    <>
      {lines.slice(0, shown).map((line) => (
        <p key={`${line.tone}-${line.text}`} className="whitespace-pre-wrap">
          {line.prefix ? (
            <>
              <span className={toneClass(line.tone)}>{line.prefix}</span>{" "}
              <span className="text-muted">{line.text}</span>
            </>
          ) : (
            <span className={toneClass(line.tone)}>{line.text}</span>
          )}
        </p>
      ))}
      {shown < lines.length ? (
        <span className="inline-block h-3 w-1.5 animate-pulse bg-accent" />
      ) : null}
    </>
  );
}

function KeyCap({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-5 items-center border-[1.5px] border-hairline bg-canvas px-1 font-mono text-[10px] font-semibold text-primary">
      {children}
    </kbd>
  );
}

export function WorkstationPreview() {
  const [demo, setDemo] = useState<DemoId>("mode");
  const [mode, setMode] = useState<ModeName>("WORK");
  const [ctlIndex, setCtlIndex] = useState(4);
  const [ctlResult, setCtlResult] = useState<string | null>(null);
  const [clock, setClock] = useState("");

  const layout = useMemo(() => modes.find((item) => item.name === mode) ?? modes[0], [mode]);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setClock(
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
      );
    };

    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);

  const cycleMode = useCallback(() => {
    setMode((current) => {
      const index = modes.findIndex((item) => item.name === current);
      return modes[(index + 1) % modes.length].name;
    });
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const withSuper = event.metaKey || event.ctrlKey;

      if (withSuper && event.key === "Escape") {
        event.preventDefault();
        setDemo("ctl");
        return;
      }

      if (withSuper && event.key.toLowerCase() === "m") {
        event.preventDefault();
        setDemo("mode");
        cycleMode();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setDemo((current) => demos[(demos.findIndex((item) => item.id === current) + 1) % demos.length].id);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setDemo(
          (current) =>
            demos[
              (demos.findIndex((item) => item.id === current) - 1 + demos.length) % demos.length
            ].id
        );
        return;
      }

      if (event.key >= "1" && event.key <= "4") {
        event.preventDefault();
        setDemo(demos[Number(event.key) - 1].id);
        return;
      }

      if (demo === "ctl") {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setCtlIndex((index) => (index + 1) % ctlEntries.length);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setCtlIndex((index) => (index - 1 + ctlEntries.length) % ctlEntries.length);
        } else if (event.key === "Enter") {
          event.preventDefault();
          setCtlResult(ctlEntries[ctlIndex]);
        } else if (event.key === "Escape") {
          event.preventDefault();
          setCtlResult(null);
          setDemo("mode");
        }
        return;
      }

      if (demo === "mode" && event.key.toLowerCase() === "m") {
        event.preventDefault();
        cycleMode();
        return;
      }

      // Letter shortcuts only apply outside the menu overlay, where typing is
      // reserved for the simulated filter.
      if (!withSuper) {
        const key = event.key.toLowerCase();

        if (key === "d") {
          event.preventDefault();
          setDemo("doctor");
        } else if (key === "s") {
          event.preventDefault();
          setDemo("snapshot");
        }
      }
    },
    [ctlIndex, cycleMode, demo]
  );

  return (
    <div id="preview" className="mx-auto mt-14 max-w-5xl scroll-mt-20 sm:mt-20">
      <div
        role="application"
        aria-label="Interactive FluorineOS workstation preview"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocus={() => setCtlResult(null)}
        className="group border-[1.5px] border-hairline bg-canvas outline-none focus-visible:border-accent"
      >
        {/* Simulated Waybar. Focus mode hides it, exactly as the real profile does. */}
        <div
          aria-hidden={mode === "FOCUS"}
          className={`overflow-hidden border-b-[1.5px] border-hairline bg-surface transition-all duration-300 ${
            mode === "FOCUS" ? "max-h-0 border-b-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="flex items-center justify-between gap-3 px-3 py-1.5 font-mono text-[11px]">
            <div className="flex items-center gap-1">
              <span className="bg-accent px-1.5 py-0.5 font-semibold text-canvas">1</span>
              <span className="px-1.5 py-0.5 text-muted">2</span>
              <span className="px-1.5 py-0.5 text-muted">3</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="border-[1.5px] border-hairline px-1.5 py-0.5 tracking-[0.06em] text-accent">
                {mode}
              </span>
              <span className="hidden text-primary sm:inline">{clock || "--:--"}</span>
              <span className="text-muted">SYS</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[236px_1fr]">
          <div className="border-b-[1.5px] border-hairline p-3 md:border-b-0 md:border-r-[1.5px]">
            <p className="px-1 pb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Try a command
            </p>
            <ul className="flex flex-col gap-2">
              {demos.map((item, index) => {
                const selected = demo === item.id;

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setDemo(item.id);
                        setCtlResult(null);
                      }}
                      aria-pressed={selected}
                      className={`w-full border-[1.5px] px-2 py-2 text-left transition-colors ${
                        selected
                          ? "border-accent bg-surface"
                          : "border-hairline bg-canvas hover:border-accent"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1">
                          {item.keys.map((key) => (
                            <KeyCap key={key}>{key}</KeyCap>
                          ))}
                        </span>
                        <span className="font-mono text-[10px] text-muted">{index + 1}</span>
                      </span>
                      <span className="mt-1.5 block text-[13px] font-medium text-primary">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block font-mono text-[10px] text-muted">
                        {item.command}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-3 border-t-[1.5px] border-hairline pt-2 text-[11px] leading-[1.5] text-muted">
              Click a command, or focus this frame and press 1 to 4. SUPER plus Escape and SUPER
              plus M work while the frame has focus.
            </p>
          </div>

          {/* Desktop canvas: the shipped wall1.png wallpaper sits behind the
              mock windows, and the windows react to the selected profile. */}
          <div
            className="relative flex min-h-[340px] flex-col justify-between bg-canvas bg-cover bg-center p-3 sm:min-h-[380px]"
            style={{ backgroundImage: "url('/screenshots/wall1.png')" }}
          >
            <div
              className="grid flex-1 grid-cols-1 gap-2 transition-all duration-300 sm:grid-cols-2"
              style={{
                gap: `${layout.gaps}px`,
                padding: `${layout.gaps}px`,
              }}
            >
              <div
                className="flex flex-col justify-between border-[1.5px] bg-surface p-3 transition-all duration-300"
                style={{
                  borderColor: "#B4F03A",
                  borderWidth: `${layout.border}px`,
                  opacity: 1,
                }}
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-muted">
                  <span>kitty</span>
                  <span>active</span>
                </div>
                <p className="mt-2 font-mono text-[11px] leading-[1.6] text-primary">
                  $ flr-mode {mode.toLowerCase()}
                  <br />
                  <span className="text-accent">{mode}</span>
                  <br />
                  <span className="text-muted">{layout.summary}</span>
                </p>
              </div>

              <div
                className="flex flex-col justify-between border-[1.5px] bg-surface p-3 transition-all duration-300"
                style={{
                  borderColor: "#1C2229",
                  borderWidth: `${layout.border}px`,
                  opacity: layout.inactiveOpacity,
                }}
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-muted">
                  <span>waybar</span>
                  <span>inactive</span>
                </div>
                <p className="mt-2 font-mono text-[11px] leading-[1.6] text-muted">
                  decoration:inactive_opacity {layout.inactiveOpacity.toFixed(2)}
                  <br />
                  general:border_size {layout.border}
                  <br />
                  general:gaps_out {mode === "PRESENT" ? 14 : layout.gaps}
                </p>
              </div>
            </div>

            {demo === "mode" ? (
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t-[1.5px] border-hairline pt-3">
                {modes.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setMode(item.name)}
                    aria-pressed={mode === item.name}
                    className={`border-[1.5px] px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] transition-colors ${
                      mode === item.name
                        ? "border-accent text-accent"
                        : "border-hairline text-muted hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            ) : null}

            {/* Fuzzel menu overlay for flr-ctl. */}
            {demo === "ctl" ? (
              <div className="absolute inset-3 flex items-start justify-center bg-canvas/80 px-1 py-3">
                <div className="w-full max-w-[290px] border-[1.5px] border-hairline bg-surface">
                  <div className="flex items-center gap-1 border-b-[1.5px] border-hairline px-2 py-1.5 font-mono text-[11px]">
                    <span className="text-accent">System &gt;</span>
                    <span className="text-muted">type to filter</span>
                  </div>
                  <ul className="max-h-[220px] overflow-y-auto py-1 font-mono text-[11px]">
                    {ctlEntries.map((entry, index) => (
                      <li key={entry}>
                        <button
                          type="button"
                          onMouseEnter={() => setCtlIndex(index)}
                          onClick={() => setCtlResult(entry)}
                          className={`block w-full px-2 py-[3px] text-left transition-colors ${
                            index === ctlIndex
                              ? "bg-selection text-primary"
                              : "text-muted hover:text-primary"
                          }`}
                        >
                          {entry}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {/* Kitty overlay for the terminal demos. */}
            {demo === "doctor" || demo === "snapshot" ? (
              <div className="absolute inset-3 flex flex-col border-[1.5px] border-hairline bg-surface">
                <div className="flex items-center justify-between border-b-[1.5px] border-hairline px-2 py-1 font-mono text-[10px] text-muted">
                  <span>{demo === "doctor" ? "flr-doctor" : "flr-snapshot"}</span>
                  <span>kitty</span>
                </div>
                <div className="flex-1 overflow-y-auto px-2 py-2 font-mono text-[11px] leading-[1.7]">
                  {demo === "doctor" ? (
                    <TypedOutput key="doctor" lines={doctorOutput} speed={260} />
                  ) : (
                    <TypedOutput key="snapshot" lines={snapshotSteps} speed={320} />
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t-[1.5px] border-hairline px-3 py-2 font-mono text-[10px] text-muted">
          <span>
            mode <span className="text-primary">{mode}</span>
            {ctlResult ? (
              <>
                {"  "}selected <span className="text-accent">{ctlResult}</span>
              </>
            ) : null}
          </span>
          <span className="hidden sm:inline">static preview, no system calls</span>
        </div>
      </div>

      <p className="mt-3 text-[12px] leading-[1.6] text-muted">
        This frame mirrors the shipped desktop configuration with the same colours, borders, and
        keybindings. Nothing here touches a real machine.
      </p>
    </div>
  );
}
