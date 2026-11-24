import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Changelog - FluorineOS",
  description:
    "Release history for FluorineOS: the desktop, artwork, and installer changes shipped in each version on Debian 13 and Hyprland.",
  alternates: {
    canonical: "/changelog",
  },
  openGraph: {
    title: "Changelog - FluorineOS",
    description:
      "Release history for FluorineOS: the desktop, artwork, and installer changes shipped in each version.",
    url: "https://fluorineos.pages.dev/changelog",
    siteName: "FluorineOS",
    locale: "en_US",
    type: "article",
  },
};

type Release = {
  version: string;
  name: string;
  summary: string;
  notes: string[];
};

const releases: Release[] = [
  {
    version: "0.3.0",
    name: "Hardware support and installer guidance",
    summary:
      "The image now boots on bare-metal laptops and desktops, offers LUKS2 full-disk encryption, and explains the desktop while it copies.",
    notes: [
      "fluorine-desktop 0.3.0 adds flr-ctl, a Fuzzel system menu bound to SUPER + Escape and reachable from the Waybar SYS indicator.",
      "flr-ctl covers network settings, Bluetooth, display layout, audio, power profiles, keybindings, diagnostics, locking, suspend, reboot, and shutdown.",
      "fluorine-desktop 0.3.0 adds flr-update, which refreshes the package index, lists incoming FluorineOS and security upgrades, and reports a pending reboot.",
      "The chroot resolves the non-free and non-free-firmware components and installs firmware-linux-nonfree, firmware-iwlwifi, firmware-realtek, firmware-atheros, intel-microcode, and amd64-microcode.",
      "cryptsetup-initramfs is installed so the boot initramfs can unlock an encrypted root volume.",
      "Calamares enables automated partitioning with LUKS2 through enableLuksAutomatedPartitioning and luksGeneration.",
      "fluorine-artwork 0.3.0 replaces the installer slideshow with three slides on keybindings, configuration paths, and maintenance commands.",
    ],
  },
  {
    version: "0.2.0",
    name: "Session helpers and a reproducible image",
    summary:
      "The desktop grew small, single-purpose helpers, and the ISO build moved into a workflow that produces the same image every run.",
    notes: [
      "fluorine-desktop 0.2.0 shipped the flr-* helpers: flr-tui for a persistent terminal, flr-keys for the keybinding cheatsheet, flr-power for profile cycling, flr-shot for screenshots, and flr-bt for Bluetooth.",
      "flr-doctor reports session and repository health from a single command.",
      "fluorine-artwork carried the 0.2.0 version strings through the Calamares branding, slideshow, stylesheet, and Plymouth theme.",
      "The ISO workflow is pinned, checks its inputs, and validates the built image before upload.",
      "Release v0.2.0 published the live image with checksums and the APT archive containing desktop 0.2.0, artwork 0.1.3, and keyring 0.0.2.",
    ],
  },
  {
    version: "0.1.0",
    name: "Packaging split",
    summary:
      "The desktop stopped being a single hand-copied tree and became three Debian packages with a signed archive behind them.",
    notes: [
      "fluorine-desktop, fluorine-artwork, and fluorine-keyring were separated so each could be versioned and upgraded on its own.",
      "The apt-repo archive publishes the three packages for trixie with a signed Release file.",
      "fluorine-artwork installs the AMOLED wallpapers, the Plymouth boot theme, GTK and Qt palettes, dconf defaults, and the fontconfig alias that resolves the UI family.",
      "The documentation portal gained installation, desktop workflow, customization, and recovery sections.",
    ],
  },
  {
    version: "0.0.1",
    name: "Initial image",
    summary:
      "The first FluorineOS image: Debian 13 with a Hyprland session, a Calamares installer, and a minimal set of desktop defaults.",
    notes: [
      "Base system is Debian 13 (trixie) for amd64 only, built with live-build.",
      "Hyprland 0.55.x is installed from trixie-backports and pinned with an APT preferences file so the rest of the system stays on trixie.",
      "The session is configured in native Lua at ~/.config/hypr/hyprland.lua, with Waybar, kitty, Fuzzel, and SwayNotificationCenter alongside it.",
      "greetd and tuigreet provide the login prompt and launch start-hyprland.",
      "Calamares installs the image, and /etc/skel carries the default configuration for new users.",
      "The AMOLED Void palette fixes the canvas at #000000 with the lime accent #B4F03A for focus and active states only.",
    ],
  },
];

function ReleaseCard({ release }: { release: Release }) {
  return (
    <article className="border-[1.5px] border-hairline bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <span className="border-[1.5px] border-hairline bg-canvas px-2 py-1 font-mono text-[11px] tracking-[0.08em] text-accent">
          {release.version}
        </span>
        <h2 className="text-xl text-primary sm:text-2xl">{release.name}</h2>
      </div>

      <p className="mt-4 max-w-3xl text-[15px] leading-[1.6] text-primary">
        {release.summary}
      </p>

      <ul className="mt-5 space-y-3 border-t-[1.5px] border-hairline pt-5">
        {release.notes.map((note) => (
          <li key={note} className="flex gap-3 text-[14px] leading-[1.6] text-muted">
            <span aria-hidden="true" className="mt-[0.6em] h-[1.5px] w-3 shrink-0 bg-hairline" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Changelog() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-canvas text-primary">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:border-[1.5px] focus:border-accent focus:bg-canvas focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-primary"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
            Release history
          </p>
          <h1 className="mt-3 text-4xl text-primary sm:text-5xl sm:leading-[1.2]">
            Changelog
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.65] text-muted">
            Every FluorineOS release, newest first. Entries describe what changed in the
            desktop, the artwork, and the installer, and stay close to the package versions
            published in the APT archive.
          </p>

          <div className="mt-12 space-y-6">
            {releases.map((release) => (
              <ReleaseCard key={release.version} release={release} />
            ))}
          </div>

          <p className="mt-12 border-t-[1.5px] border-hairline pt-6 font-mono text-[12px] text-muted">
            Installed systems follow these releases with{" "}
            <span className="text-primary">flr-update</span>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
