"use client";

import { useState } from "react";
import Link from "next/link";
import { Section } from "./Section";
import {
  IconCheck,
  IconCopy,
  IconCpu,
  IconDownload,
  IconGithub,
  IconTerminal,
} from "./Icons";

type CopyState = "idle" | "copied" | "failed";

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the selection-based fallback below.
  }

  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const succeeded = document.execCommand("copy");
    document.body.removeChild(area);
    return succeeded;
  } catch {
    return false;
  }
}

interface CodeBlockProps {
  label: string;
  command: string;
}

function CopyableCodeBlock({ label, command }: CodeBlockProps) {
  const [state, setState] = useState<CopyState>("idle");

  const handleCopy = async () => {
    const succeeded = await copyText(command);
    setState(succeeded ? "copied" : "failed");
    window.setTimeout(() => setState("idle"), 2400);
  };

  return (
    <div className="border-[1.5px] border-hairline bg-canvas">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-[1.5px] border-hairline bg-surface px-3 py-2">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
          <IconTerminal className="h-3.5 w-3.5 text-accent" />
          <span>{label}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex h-7 items-center gap-1.5 border-[1.5px] bg-canvas px-2 font-mono text-[11px] transition-colors ${
            state === "copied"
              ? "border-accent text-accent"
              : state === "failed"
                ? "border-warning text-warning"
                : "border-hairline text-primary hover:border-accent hover:text-accent"
          }`}
        >
          {state === "copied" ? (
            <IconCheck className="h-3.5 w-3.5" />
          ) : (
            <IconCopy className="h-3.5 w-3.5" />
          )}
          <span>
            {state === "copied"
              ? "Copied"
              : state === "failed"
                ? "Select and copy"
                : "Copy"}
          </span>
        </button>
        <span aria-live="polite" className="sr-only">
          {state === "copied"
            ? `${label} copied to clipboard`
            : state === "failed"
              ? `${label} could not be copied. Select the command and copy it manually.`
              : ""}
        </span>
      </div>
      <pre className="overflow-x-auto p-3 text-[11px] leading-[1.65] text-primary sm:text-xs">
        <code>{command}</code>
      </pre>
    </div>
  );
}

const requirements = [
  { component: "Architecture", value: "x86_64 (amd64)" },
  { component: "Memory", value: "4 GB minimum, 8 GB or more" },
  { component: "Storage", value: "20 GB free, 50 GB NVMe / SSD" },
  { component: "Firmware", value: "UEFI x64" },
  { component: "Graphics", value: "KMS / DRM; Intel, AMD, or Nouveau" },
];

const components = [
  ["Base distribution", "Debian 13 (trixie)"],
  ["Wayland compositor", "Hyprland 0.55+ (Lua config)"],
  ["Display manager", "greetd + tuigreet"],
  ["Audio server", "PipeWire + WirePlumber"],
  ["Swap compression", "ZRAM with zstd algorithm"],
  ["Host firewall", "ufw active by default"],
];

const steps: { label: string; title: string; description: string; command: string }[] = [
  {
    label: "Step 1",
    title: "Verify the download",
    description:
      "Compare the image against the published checksum before writing it to removable media.",
    command: "sha256sum -c FluorineOS-0.2.0-amd64.iso.sha256",
  },
  {
    label: "Step 2",
    title: "Write the image to a USB drive",
    description:
      "Replace /dev/sdX with your target device. Everything on that device will be erased.",
    command:
      "sudo dd if=FluorineOS-0.2.0-amd64.iso of=/dev/sdX bs=4M status=progress oflag=sync",
  },
  {
    label: "Step 3",
    title: "Add the APT repository on Debian 13",
    description:
      "Optional. Install the desktop stack on an existing trixie system instead of reinstalling.",
    command: `# Download the archive signing key
curl -fsSLo /tmp/fluorineos-archive-keyring.asc https://fluorineos.github.io/apt-repo/fluorineos-archive-keyring.asc
sudo install -m 0644 /tmp/fluorineos-archive-keyring.asc /usr/share/keyrings/fluorineos-archive-keyring.asc

# Configure the deb822 source
sudo tee /etc/apt/sources.list.d/fluorineos.sources << 'EOF'
Types: deb
URIs: https://fluorineos.github.io/apt-repo
Suites: trixie
Components: main
Architectures: amd64
Signed-By: /usr/share/keyrings/fluorineos-archive-keyring.asc
EOF

# Refresh the package index and install the desktop stack
sudo apt-get update && sudo apt-get install -y fluorine-desktop`,
  },
];

const flintSteps: { title: string; description: string }[] = [
  {
    title: "Download Flint",
    description:
      "Get flint.exe from the release page or open flintweb.vercel.app. It is a portable build, so there is nothing to install.",
  },
  {
    title: "Drop the image onto Flint",
    description:
      "Drag FluorineOS-0.2.0-amd64.iso into the window. Flint computes its SHA-256 checksum before anything touches a drive.",
  },
  {
    title: "Pick the drive and flash",
    description:
      "Select the target USB drive and type its serial to confirm. Flint writes the image, then reads every byte back and verifies it against the checksum.",
  },
];

const releaseImage = {
  version: "0.2.0",
  name: "FluorineOS-0.2.0-amd64.iso",
  size: "1.30 GiB (1390624768 bytes)",
  digest: "9b8c045e0a5d27cfd7d148a5ca720d7e59533c6eaa9d0b51f93ae3abd7fed780",
};

export function ArchitectureInstall() {
  return (
    <Section
      id="architecture"
      eyebrow="Specifications and deployment"
      title="System architecture and installation"
      description="FluorineOS targets standard x86_64 hardware with UEFI firmware. Verified on physical workstations and virtualization hosts."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-6 lg:col-span-5">
          <div className="border-[1.5px] border-hairline bg-surface p-5 sm:p-6">
            <h3 className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              <IconCpu className="h-4 w-4 text-accent" />
              Hardware requirements
            </h3>

            <dl className="mt-4 border-t-[1.5px] border-hairline">
              {requirements.map((row) => (
                <div
                  key={row.component}
                  className="grid grid-cols-1 gap-x-4 gap-y-0.5 border-b-[1.5px] border-hairline py-2.5 font-mono text-[11px] last:border-b-0 sm:grid-cols-[8rem_1fr]"
                >
                  <dt className="text-muted">{row.component}</dt>
                  <dd className="text-primary">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border-[1.5px] border-hairline bg-surface p-5 sm:p-6">
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Core system components
            </h3>
            <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {components.map(([label, value]) => (
                <div key={label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {label}
                  </dt>
                  <dd className="mt-1 text-[13px] text-primary">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div id="install" className="scroll-mt-24 lg:col-span-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-primary">Installation</h3>
              <p className="mt-1 text-[13px] leading-[1.6] text-muted">
                Three steps from the downloaded image to a running workstation.
              </p>
            </div>
            <Link
              href="https://github.com/FluorineOS/fluorine/releases/tag/v0.2.0"
              className="inline-flex shrink-0 items-center justify-center gap-2 border-[1.5px] border-hairline bg-surface px-3 py-2 text-[12px] font-medium text-primary transition-colors hover:border-accent"
            >
              <IconDownload className="h-3.5 w-3.5" />
              <span>Get the ISO</span>
            </Link>
          </div>

          <div className="mt-6 border-[1.5px] border-hairline bg-surface p-4 sm:p-5">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Release image {releaseImage.version}
            </h4>
            <dl className="mt-3 space-y-2 font-mono text-[11px] leading-[1.6]">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt className="shrink-0 text-muted sm:w-20">File</dt>
                <dd className="break-all text-primary">{releaseImage.name}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt className="shrink-0 text-muted sm:w-20">Size</dt>
                <dd className="break-all text-primary">{releaseImage.size}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt className="shrink-0 text-muted sm:w-20">SHA-256</dt>
                <dd className="break-all text-primary">{releaseImage.digest}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 space-y-5">
            {steps.map((step) => (
              <article key={step.label}>
                <h4 className="flex flex-wrap items-baseline gap-2">
                  <span className="border-[1.5px] border-hairline bg-surface px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    {step.label}
                  </span>
                  <span className="text-[13px] font-semibold text-primary">
                    {step.title}
                  </span>
                </h4>
                <p className="mt-1.5 text-[13px] leading-[1.6] text-muted">
                  {step.description}
                </p>
                <div className="mt-3">
                  <CopyableCodeBlock label="Command" command={step.command} />
                </div>
              </article>
            ))}
          </div>

          <aside
            aria-labelledby="flint-title"
            className="relative mt-8 overflow-hidden border-[1.5px] border-hairline bg-surface p-5 pl-7 sm:p-6 sm:pl-8"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-[3px] bg-accent"
            />
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              Recommended on Windows
            </p>
            <h4
              id="flint-title"
              className="mt-2 text-[15px] font-semibold text-primary"
            >
              FluorineOS recommends Flint for writing USB media
            </h4>
            <p className="mt-2 text-[13px] leading-[1.65] text-muted">
              Flint is our native Windows companion: a PyQt6 application that
              talks to the drive through Win32 disk I/O with unbuffered writes,
              then reads it back and compares every byte against a SHA-256
              digest of the image. It runs as a portable executable, needs no
              installation, and refuses to touch a drive until you type the
              serial of the one you selected.
            </p>

            <ol className="mt-4 space-y-3">
              {flintSteps.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-[1.5px] border-hairline bg-canvas font-mono text-[10px] text-accent">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-primary">
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-[12.5px] leading-[1.6] text-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="https://flintweb.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent px-3 py-2 text-[12px] font-semibold text-canvas transition-colors hover:bg-accent-hover"
              >
                <IconDownload className="h-3.5 w-3.5" />
                <span>Get Flint</span>
              </a>
              <a
                href="https://github.com/flintusb/Flint"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-[1.5px] border-hairline bg-canvas px-3 py-2 text-[12px] font-medium text-primary transition-colors hover:border-accent"
              >
                <IconGithub className="h-3.5 w-3.5" />
                <span>Source on GitHub</span>
              </a>
            </div>

            <p className="mt-3 font-mono text-[10px] leading-[1.6] text-muted">
              flintweb.vercel.app / github.com/flintusb/Flint
            </p>
          </aside>
        </div>
      </div>
    </Section>
  );
}
