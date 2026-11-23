import Link from "next/link";
import { IconDownload, IconExternal } from "./Icons";
import LightRays from "./LightRays";
import { WorkstationPreview } from "./WorkstationPreview";

const platformMeta = ["Debian 13 (trixie)", "Hyprland 0.55+", "amd64 (x86_64)"];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-canvas"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px]"
        style={{
          maskImage:
            "linear-gradient(to bottom, #000000 0%, #000000 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000000 0%, #000000 55%, transparent 100%)",
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#b4f03a"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          glow={0.6}
          haze={0.25}
          followMouse
          mouseInfluence={0.1}
          opacity={0.5}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pt-12 pb-8 sm:px-6 sm:pt-20 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 border-[1.5px] border-hairline bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
            Release 0.1.0
          </p>

          <h1
            id="hero-title"
            className="mt-7 text-balance text-[2.25rem] leading-[1.08] text-primary sm:text-5xl sm:leading-[1.05] lg:text-6xl"
          >
            A clean, customizable Wayland workstation.
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-[15px] leading-[1.6] text-muted sm:text-base">
            Built on Debian 13 and Hyprland. Cohesive out of the box, configured
            in readable plain text, and engineered for focused daily development.
          </p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {platformMeta.map((item, index) => (
              <li key={item} className="flex items-center gap-2">
                <span>{item}</span>
                {index < platformMeta.length - 1 ? (
                  <span aria-hidden="true" className="text-hairline">
                    /
                  </span>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href="https://github.com/FluorineOS/fluorine/releases/tag/v0.1.0"
              className="inline-flex items-center justify-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-accent-hover"
            >
              <IconDownload className="h-4 w-4" />
              <span>Download ISO 0.1.0</span>
            </Link>

            <Link
              href="https://github.com/FluorineOS/fluorine"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 border-[1.5px] border-hairline bg-surface px-5 py-3 text-sm font-medium text-primary transition-colors hover:border-accent"
            >
              <span>Explore source</span>
              <IconExternal className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
            </Link>
          </div>
        </div>

        <WorkstationPreview />
      </div>
    </section>
  );
}
