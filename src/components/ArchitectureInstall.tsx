"use client";

import React, { useState } from "react";
import { IconCopy, IconCheck, IconCpu, IconTerminal } from "./Icons";

interface CodeBlockProps {
  label: string;
  command: string;
}

function CopyableCodeBlock({ label, command }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className="bg-[#000000] rounded-[6px] border border-[#1C2229] overflow-hidden"
      style={{ borderWidth: "1.5px" }}
    >
      <div
        className="flex items-center justify-between px-3.5 py-2 bg-[#0A0D10] border-b border-[#1C2229] text-xs font-mono"
        style={{ borderBottomWidth: "1.5px" }}
      >
        <div className="flex items-center gap-2 text-[#E2E8F0]">
          <IconTerminal className="w-3.5 h-3.5 text-[#B4F03A]" />
          <span>{label}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-[4px] border border-[#1C2229] bg-[#000000] text-[#E2E8F0] hover:border-[#B4F03A] hover:text-[#B4F03A] transition-colors text-xs"
          style={{ borderWidth: "1.5px" }}
        >
          {copied ? (
            <>
              <IconCheck className="w-3.5 h-3.5 text-[#B4F03A]" />
              <span className="text-[#B4F03A]">Copied</span>
            </>
          ) : (
            <>
              <IconCopy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-3.5 overflow-x-auto">
        <pre className="text-xs font-mono text-[#E2E8F0] leading-relaxed">
          <code>{command}</code>
        </pre>
      </div>
    </div>
  );
}

export function ArchitectureInstall() {
  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="mb-12">
        <h2 className="text-xs uppercase tracking-wider font-semibold text-[#B4F03A] mb-3">
          Specifications & Deployment
        </h2>
        <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E2E8F0]">
          System Architecture & Installation
        </p>
        <p className="mt-3 text-sm text-[#6E7681] max-w-2xl leading-relaxed">
          FluorineOS targets standard x86_64 PC hardware with UEFI firmware. Verified on
          physical workstations and virtualization hosts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Stack & Hardware Requirements */}
        <div className="lg:col-span-6 space-y-6">
          {/* Hardware Requirements */}
          <div
            className="p-6 bg-[#0A0D10] rounded-[6px] border border-[#1C2229]"
            style={{ borderWidth: "1.5px" }}
          >
            <div className="flex items-center gap-2 mb-4 text-[#B4F03A]">
              <IconCpu className="w-4 h-4" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#E2E8F0]">
                Hardware Requirements
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#1C2229] text-[#6E7681]" style={{ borderBottomWidth: "1.5px" }}>
                    <th className="py-2 pr-4 font-medium">Component</th>
                    <th className="py-2 pr-4 font-medium">Minimum</th>
                    <th className="py-2 font-medium">Recommended</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C2229] text-[#E2E8F0]">
                  <tr>
                    <td className="py-2.5 pr-4 text-[#6E7681]">Architecture</td>
                    <td className="py-2.5 pr-4">x86_64 (amd64)</td>
                    <td className="py-2.5">x86_64 (amd64)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-[#6E7681]">Memory (RAM)</td>
                    <td className="py-2.5 pr-4">4 GB</td>
                    <td className="py-2.5">8 GB or more</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-[#6E7681]">Storage</td>
                    <td className="py-2.5 pr-4">20 GB free</td>
                    <td className="py-2.5">50 GB NVMe / SSD</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-[#6E7681]">Firmware</td>
                    <td className="py-2.5 pr-4">UEFI x64</td>
                    <td className="py-2.5">UEFI x64</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-[#6E7681]">Graphics</td>
                    <td className="py-2.5 pr-4">KMS / DRM GPU</td>
                    <td className="py-2.5">Intel, AMD, or Nouveau</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Software Stack Specifications */}
          <div
            className="p-6 bg-[#0A0D10] rounded-[6px] border border-[#1C2229]"
            style={{ borderWidth: "1.5px" }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#E2E8F0] mb-4">
              Core System Components
            </h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <dt className="text-[#6E7681]">Base Distribution</dt>
                <dd className="text-[#E2E8F0] mt-1">Debian 13 (trixie)</dd>
              </div>
              <div>
                <dt className="text-[#6E7681]">Wayland Compositor</dt>
                <dd className="text-[#E2E8F0] mt-1">Hyprland 0.55+ (Lua config)</dd>
              </div>
              <div>
                <dt className="text-[#6E7681]">Display Manager</dt>
                <dd className="text-[#E2E8F0] mt-1">greetd + tuigreet</dd>
              </div>
              <div>
                <dt className="text-[#6E7681]">Audio Server</dt>
                <dd className="text-[#E2E8F0] mt-1">PipeWire + WirePlumber</dd>
              </div>
              <div>
                <dt className="text-[#6E7681]">Swap Compression</dt>
                <dd className="text-[#E2E8F0] mt-1">ZRAM with zstd algorithm</dd>
              </div>
              <div>
                <dt className="text-[#6E7681]">Host Firewall</dt>
                <dd className="text-[#E2E8F0] mt-1">ufw active by default</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right Column: Copyable Terminal Blocks */}
        <div id="install" className="lg:col-span-6 space-y-4 scroll-mt-24">
          <CopyableCodeBlock
            label="1. Verify ISO Checksum"
            command="sha256sum -c FluorineOS-0.0.1-amd64.iso.sha256"
          />

          <CopyableCodeBlock
            label="2. Flash to Removable Media (USB)"
            command="sudo dd if=FluorineOS-0.0.1-amd64.iso of=/dev/sdX bs=4M status=progress oflag=sync"
          />

          <CopyableCodeBlock
            label="3. Add APT Repository on Debian 13"
            command={`# Install archive signing key
curl -fsSL https://fluorineos.github.io/apt-repo/fluorineos-archive-keyring.gpg | sudo tee /usr/share/keyrings/fluorineos-archive-keyring.gpg > /dev/null

# Configure deb822 source
sudo tee /etc/apt/sources.list.d/fluorineos.sources << 'EOF'
Types: deb
URIs: https://fluorineos.github.io/apt-repo
Suites: trixie
Components: main
Architectures: amd64
Signed-By: /usr/share/keyrings/fluorineos-archive-keyring.gpg
EOF

# Refresh package index and install desktop stack
sudo apt-get update && sudo apt-get install -y fluorine-desktop`}
          />
        </div>
      </div>
    </section>
  );
}
