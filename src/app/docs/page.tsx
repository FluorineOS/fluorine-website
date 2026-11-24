import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocsNav } from "@/components/docs/DocsNav";
import { IconArrowRight, IconTerminal } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Documentation - FluorineOS",
  description:
    "Installation, desktop workflow, customization, and recovery reference for FluorineOS 0.2.0 on Debian 13 and Hyprland.",
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "Documentation - FluorineOS",
    description:
      "Installation, desktop workflow, customization, and recovery reference for FluorineOS 0.2.0.",
    url: "https://fluorineos.pages.dev/docs",
    siteName: "FluorineOS",
    locale: "en_US",
    type: "article",
  },
};

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-block border-[1.5px] border-hairline bg-surface px-1.5 py-0.5 font-mono text-[11px] leading-[1.4] text-primary">
      {children}
    </kbd>
  );
}

function DocSection({
  id,
  index,
  title,
  summary,
  children,
}: {
  id: string;
  index: string;
  title: string;
  summary: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mt-14 scroll-mt-24 border-t-[1.5px] border-hairline pt-10 first:mt-0 first:border-t-0 first:pt-0"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
        Section {index}
      </p>
      <h2
        id={`${id}-title`}
        className="mt-2 text-balance text-2xl text-primary sm:text-[1.75rem] sm:leading-[1.2]"
      >
        {title}
      </h2>
      <p className="mt-3 text-[15px] leading-[1.65] text-muted">{summary}</p>
      <div className="mt-6 space-y-8">{children}</div>
    </section>
  );
}

function SubHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3
      id={id}
      className="scroll-mt-24 text-base font-semibold text-primary"
    >
      {children}
    </h3>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3 space-y-3 text-[14px] leading-[1.65] text-muted [&_a]:text-accent [&_a:hover]:underline [&_code]:text-primary [&_strong]:font-semibold [&_strong]:text-primary">
      {children}
    </div>
  );
}

function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-4 border-[1.5px] border-hairline bg-surface px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
        {title}
      </p>
      <div className="mt-1.5 text-[13px] leading-[1.65] text-muted [&_code]:text-primary">
        {children}
      </div>
    </div>
  );
}

function DataTable({
  head,
  rows,
}: {
  head: [string, string];
  rows: [ReactNode, ReactNode][];
}) {
  return (
    <div className="mt-4 overflow-x-auto border-[1.5px] border-hairline">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-surface">
            <th
              scope="col"
              className="border-b-[1.5px] border-hairline px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted"
            >
              {head[0]}
            </th>
            <th
              scope="col"
              className="border-b-[1.5px] border-hairline px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted"
            >
              {head[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="align-top">
              <th
                scope="row"
                className="border-b-[1.5px] border-hairline px-3 py-2 font-mono text-[12px] font-normal text-primary last:border-b-0"
              >
                {row[0]}
              </th>
              <td className="border-b-[1.5px] border-hairline px-3 py-2 text-[13px] leading-[1.65] text-muted last:border-b-0 [&_kbd]:align-middle">
                {row[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DocsPage() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-canvas text-primary">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:border-[1.5px] focus:border-accent focus:bg-canvas focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-primary"
      >
        Skip to content
      </a>
      <Navbar />

      <div className="border-b-[1.5px] border-hairline">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-primary">
                Documentation
              </li>
            </ol>
          </nav>
          <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            Documentation
          </p>
          <h1 className="mt-3 text-balance text-3xl text-primary sm:text-[2.5rem] sm:leading-[1.15]">
            Operating a FluorineOS workstation
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-[1.65] text-muted">
            Reference material for installing, running, customizing, and repairing
            FluorineOS 0.2.0. Every command here matches the shipped image and the
            packages in the official APT repository.
          </p>
        </div>
      </div>

      <main id="main" className="flex-1">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[232px_minmax(0,1fr)] lg:gap-10">
            <aside
              aria-label="Documentation navigation"
              className="border-b-[1.5px] border-hairline py-6 lg:sticky lg:top-16 lg:max-h-[calc(100vh-4rem)] lg:self-start lg:overflow-y-auto lg:border-b-0 lg:border-r-[1.5px] lg:border-hairline lg:py-10 lg:pr-6"
            >
              <DocsNav />
            </aside>

            <div className="max-w-3xl py-10 lg:py-12">
              <DocSection
                id="installation"
                index="01"
                title="Installation"
                summary="FluorineOS ships as a hybrid UEFI live image with an offline Calamares installer. The target machine needs no network access to install, because every package the desktop requires is already on the medium."
              >
                <div>
                  <SubHeading id="requirements">Hardware requirements</SubHeading>
                  <DataTable
                    head={["Component", "Requirement"]}
                    rows={[
                      ["Architecture", "x86_64 (amd64) only"],
                      ["Memory", "4 GB minimum, 8 GB recommended"],
                      ["Storage", "20 GB free, 50 GB SSD recommended"],
                      ["Firmware", "UEFI x64, 64-bit"],
                      ["Graphics", "KMS / DRM: Intel, AMD, or Nouveau"],
                      ["Network", "Optional; required only for package updates"],
                    ]}
                  />
                  <Note title="Virtual machines">
                    Virtual hosts without VirGL 3D acceleration should select the
                    Safe Graphics entry at the boot menu. It sets a software
                    renderer for the live session.
                  </Note>
                </div>

                <div>
                  <SubHeading id="verify-image">Verify the image</SubHeading>
                  <Prose>
                    <p>
                      Download the ISO and its checksum file from the same release.
                      Compare the image against the published SHA-256 digest before
                      writing anything to removable media.
                    </p>
                  </Prose>
                  <CodeBlock
                    label="Terminal"
                    code={`sha256sum -c FluorineOS-0.2.0-amd64.iso.sha256`}
                  />
                  <DataTable
                    head={["Property", "Release value"]}
                    rows={[
                      ["Image file", "FluorineOS-0.2.0-amd64.iso"],
                      ["Image size", "1390624768 bytes (1.30 GiB)"],
                      [
                        "SHA-256",
                        "9b8c045e0a5d27cfd7d148a5ca720d7e59533c6eaa9d0b51f93ae3abd7fed780",
                      ],
                    ]}
                  />
                  <Prose>
                    <p>
                      The command prints <code>OK</code> and exits zero when the
                      file is intact. Any other result means the download is
                      incomplete or corrupt; download it again.
                    </p>
                  </Prose>
                </div>

                <div>
                  <SubHeading id="write-media">Write the media</SubHeading>
                  <Prose>
                    <p>
                      Identify the target device with <code>lsblk</code> first. The
                      device name for a USB drive is usually{" "}
                      <code>/dev/sdX</code> and it must never be a partition such as{" "}
                      <code>/dev/sdX1</code>.
                    </p>
                  </Prose>
                  <CodeBlock
                    label="Terminal"
                    code={`sudo dd if=FluorineOS-0.2.0-amd64.iso of=/dev/sdX bs=4M status=progress oflag=sync`}
                  />
                  <Note title="Warning">
                    Writing to the wrong device destroys its contents irreversibly.
                    Confirm the device path before running the command.
                  </Note>
                  <Prose>
                    <p>
                      Ventoy works as an alternative: copy the ISO onto the Ventoy
                      data partition, boot the machine from the Ventoy drive, then
                      select the image from its menu. No conversion step is needed
                      because the image is a hybrid ISO.
                    </p>
                  </Prose>
                </div>

                <div>
                  <SubHeading id="firmware">Firmware</SubHeading>
                  <Prose>
                    <p>
                      The image boots through UEFI x64. The loader is not signed for
                      Secure Boot, so disable Secure Boot in firmware settings before
                      booting the medium, then re-enable it afterwards if the
                      machine requires it for another operating system.
                    </p>
                    <p>
                      On AMD and Intel graphics the live session reaches the desktop
                      directly. On virtual machines and older GPUs, choose the{" "}
                      <code>Safe Graphics / VM Software Render</code> menu entry,
                      which forces a software renderer for the compositor.
                    </p>
                  </Prose>
                </div>

                <div>
                  <SubHeading id="installer">Installer</SubHeading>
                  <Prose>
                    <p>
                      Boot the medium and wait for the Hyprland live session. Start
                      Calamares from the desktop shortcut named{" "}
                      <code>Install FluorineOS</code>, then follow six steps:
                    </p>
                    <ol className="list-decimal space-y-2 pl-5">
                      <li>
                        <strong>Welcome</strong>: choose language and continue.
                      </li>
                      <li>
                        <strong>Locale</strong>: select region, timezone, and number
                        format.
                      </li>
                      <li>
                        <strong>Keyboard</strong>: pick the keyboard model and layout.
                      </li>
                      <li>
                        <strong>Partitions</strong>: erase the disk for an automatic
                        layout, or partition manually. LUKS encryption is available
                        in manual mode.
                      </li>
                      <li>
                        <strong>Users</strong>: set the account name, login name, and
                        password. This account receives sudo rights.
                      </li>
                      <li>
                        <strong>Summary</strong>: review the plan and start the
                        installation, which runs from the medium without network
                        access.
                      </li>
                    </ol>
                    <p>
                      When the installer finishes, remove the medium and reboot. The
                      installed system starts at the greetd login prompt.
                    </p>
                  </Prose>
                </div>
              </DocSection>

              <DocSection
                id="desktop"
                index="02"
                title="Desktop and workflow"
                summary="The session is a native Hyprland 0.55 Lua configuration with Waybar, Fuzzel, SwayNC, and Kitty. Logins go through greetd and tuigreet, and every shortcut is defined in one readable file."
              >
                <div>
                  <SubHeading id="login">Login</SubHeading>
                  <Prose>
                    <p>
                      The machine boots to <code>tuigreet</code> on the first text
                      console. Enter the username, then the password, and press{" "}
                      <Kbd>Enter</Kbd>. The greeter runs{" "}
                      <code>start-hyprland</code>, which establishes the environment
                      and launches the compositor.
                    </p>
                    <p>
                      The first interactive login shows the keybinding cheat sheet
                      once. Dismissing it writes a marker under{" "}
                      <code>~/.local/state/fluorine/</code>, so later logins start
                      directly in the session.
                    </p>
                  </Prose>
                </div>

                <div>
                  <SubHeading id="workspaces">Workspaces</SubHeading>
                  <Prose>
                    <p>
                      Ten numbered workspaces are available on demand. Focus moves
                      between tiled windows with the arrow keys or the{" "}
                      <Kbd>H</Kbd> <Kbd>J</Kbd> <Kbd>K</Kbd> <Kbd>;</Kbd> cluster,
                      and the dwindle layout splits the focused window in the
                      requested direction.
                    </p>
                  </Prose>
                  <DataTable
                    head={["Shortcut", "Action"]}
                    rows={[
                      [
                        <span key="ws">
                          <Kbd>SUPER</Kbd> + <Kbd>1..9</Kbd>
                        </span>,
                        "Focus workspace 1 through 9",
                      ],
                      [
                        <span key="ws-move">
                          <Kbd>SUPER</Kbd> + <Kbd>Shift</Kbd> +{" "}
                          <Kbd>1..9</Kbd>
                        </span>,
                        "Move the focused window to workspace 1 through 9",
                      ],
                      [
                        <span key="focus-arrows">
                          <Kbd>SUPER</Kbd> + <Kbd>Arrow</Kbd>
                        </span>,
                        "Move focus to the window in that direction",
                      ],
                      [
                        <span key="focus-hjkl">
                          <Kbd>SUPER</Kbd> + <Kbd>H</Kbd> <Kbd>J</Kbd>{" "}
                          <Kbd>K</Kbd> <Kbd>;</Kbd>
                        </span>,
                        "Move focus left, down, up, right",
                      ],
                    ]}
                  />
                </div>

                <div>
                  <SubHeading id="keybindings">Keybindings</SubHeading>
                  <Prose>
                    <p>
                      These are the default chords from{" "}
                      <code>~/.config/hypr/hyprland.lua</code>. Press{" "}
                      <Kbd>SUPER</Kbd> + <Kbd>/</Kbd> at any time for the same list
                      as an interactive cheat sheet.
                    </p>
                  </Prose>
                  <DataTable
                    head={["Shortcut", "Action"]}
                    rows={[
                      [
                        <span key="return">
                          <Kbd>SUPER</Kbd> + <Kbd>Return</Kbd>
                        </span>,
                        "Launch the Kitty terminal",
                      ],
                      [
                        <span key="d">
                          <Kbd>SUPER</Kbd> + <Kbd>D</Kbd>
                        </span>,
                        "Launch the Fuzzel application launcher",
                      ],
                      [
                        <span key="e">
                          <Kbd>SUPER</Kbd> + <Kbd>E</Kbd>
                        </span>,
                        "Launch the Thunar file manager",
                      ],
                      [
                        <span key="q">
                          <Kbd>SUPER</Kbd> + <Kbd>Q</Kbd>
                        </span>,
                        "Close the focused window",
                      ],
                      [
                        <span key="v">
                          <Kbd>SUPER</Kbd> + <Kbd>V</Kbd>
                        </span>,
                        "Toggle floating for the focused window",
                      ],
                      [
                        <span key="f">
                          <Kbd>SUPER</Kbd> + <Kbd>F</Kbd>
                        </span>,
                        "Toggle fullscreen for the focused window",
                      ],
                      [
                        <span key="l">
                          <Kbd>SUPER</Kbd> + <Kbd>L</Kbd>
                        </span>,
                        "Lock the session with hyprlock",
                      ],
                      [
                        <span key="c">
                          <Kbd>SUPER</Kbd> + <Kbd>C</Kbd>
                        </span>,
                        "Open clipboard history",
                      ],
                      [
                        <span key="shot">
                          <Kbd>SUPER</Kbd> + <Kbd>Shift</Kbd> + <Kbd>S</Kbd>
                        </span>,
                        "Capture a screen region with flr-shot",
                      ],
                      [
                        <span key="keys">
                          <Kbd>SUPER</Kbd> + <Kbd>/</Kbd>
                        </span>,
                        "Show the keybinding cheat sheet with flr-keys",
                      ],
                      [
                        <span key="vol">
                          <Kbd>Volume</Kbd> / <Kbd>Mute</Kbd> keys
                        </span>,
                        "Adjust or mute the default sink through wpctl",
                      ],
                      [
                        <span key="bright">
                          <Kbd>Brightness</Kbd> keys
                        </span>,
                        "Adjust panel brightness through brightnessctl",
                      ],
                    ]}
                  />
                </div>

                <div>
                  <SubHeading id="clipboard-screenshots">
                    Clipboard and screenshots
                  </SubHeading>
                  <Prose>
                    <p>
                      Clipboard history is collected by <code>cliphist</code> from
                      every text and image selection. <Kbd>SUPER</Kbd> +{" "}
                      <Kbd>C</Kbd> opens a Fuzzel menu backed by the history; choose
                      an entry with <Kbd>Enter</Kbd> to place it back on the
                      clipboard.
                    </p>
                    <p>
                      <Kbd>SUPER</Kbd> + <Kbd>Shift</Kbd> + <Kbd>S</Kbd> starts an
                      interactive region capture. The PNG is written to{" "}
                      <code>~/Pictures/Screenshots</code> and copied to the
                      clipboard at the same time. Run <code>flr-shot --full</code>{" "}
                      in a terminal to capture the entire screen instead.
                    </p>
                  </Prose>
                  <CodeBlock
                    label="Terminal"
                    code={`flr-shot --full`}
                  />
                </div>

                <div>
                  <SubHeading id="locking">Locking and idle</SubHeading>
                  <Prose>
                    <p>
                      <Kbd>SUPER</Kbd> + <Kbd>L</Kbd> locks the session
                      immediately. <code>hypridle</code> applies the same lock when
                      the workstation is left unattended: the display dims after 120
                      seconds, the session locks after 300 seconds, and the panel
                      powers down after 360 seconds. Activity restores brightness and
                      cancels the pending lock.
                    </p>
                    <p>
                      <code>hyprlock</code> is the only locker in the image. It is
                      also invoked before sleep through{" "}
                      <code>loginctl lock-session</code>.
                    </p>
                  </Prose>
                </div>
              </DocSection>

              <DocSection
                id="customization"
                index="03"
                title="Customization"
                summary="Every surface is a plain text file in the home directory. The compositor uses the Hyprland 0.55 Lua API, while hypridle and hyprlock keep their standard key-value syntax."
              >
                <div>
                  <SubHeading id="config-map">Configuration map</SubHeading>
                  <DataTable
                    head={["Path", "Purpose"]}
                    rows={[
                      [
                        <code key="lua">~/.config/hypr/hyprland.lua</code>,
                        "Compositor: monitors, gaps, borders, animations, autostart, keybindings",
                      ],
                      [
                        <code key="idle">~/.config/hypr/hypridle.conf</code>,
                        "Idle listeners for dimming, locking, and display power",
                      ],
                      [
                        <code key="lock">~/.config/hypr/hyprlock.conf</code>,
                        "Lock screen layout and colors",
                      ],
                      [
                        <code key="bar">~/.config/waybar/config.jsonc</code>,
                        "Top bar modules and workspace bindings",
                      ],
                      [
                        <code key="bar-css">~/.config/waybar/style.css</code>,
                        "Top bar typography, spacing, and colors",
                      ],
                      [
                        <code key="fuzzel">~/.config/fuzzel/fuzzel.ini</code>,
                        "Application launcher and menu appearance",
                      ],
                      [
                        <code key="kitty">~/.config/kitty/kitty.conf</code>,
                        "Terminal font, padding, opacity, and colors",
                      ],
                      [
                        <code key="swaync">~/.config/swaync/style.css</code>,
                        "Notification center styling",
                      ],
                    ]}
                  />
                  <Prose>
                    <p>
                      Configuration files live in the home directory, not in{" "}
                      <code>/etc</code>, so edits apply to one user and survive
                      package upgrades. Package updates install new defaults; keep a
                      copy of any file you have changed.
                    </p>
                  </Prose>
                </div>

                <div>
                  <SubHeading id="monitors">Monitors and scaling</SubHeading>
                  <Prose>
                    <p>
                      The fallback rule applies the preferred mode, automatic
                      placement, and a scale of 1 to every output. Replace it with a
                      rule per output when a panel needs fractional scaling, for
                      example 1.25 on a HiDPI laptop display.
                    </p>
                  </Prose>
                  <CodeBlock
                    label="~/.config/hypr/hyprland.lua"
                    code={`hl.monitor({
    output   = "",
    mode     = "preferred",
    position = "auto",
    scale    = 1.25,
})`}
                  />
                  <Prose>
                    <p>
                      Legacy X11 clients keep a 1:1 pixel scale because{" "}
                      <code>xwayland.force_zero_scaling</code> is enabled, so
                      fractional scaling does not blur them. Restart the session, or
                      reload the compositor, for the new rule to take effect.
                    </p>
                  </Prose>
                </div>

                <div>
                  <SubHeading id="gaps-borders">Gaps and borders</SubHeading>
                  <Prose>
                    <p>
                      Spacing and border colors are compositor settings. Borders are
                      2 pixels, the closest integer to the 1.5 pixel design token, and
                      the active border uses the lime accent while the inactive
                      border stays on the hairline color.
                    </p>
                  </Prose>
                  <CodeBlock
                    label="~/.config/hypr/hyprland.lua"
                    code={`hl.config({
    general = {
        border_size = 2,
        gaps_in     = 4,
        gaps_out    = 6,

        col = {
            active_border   = { colors = { "rgba(b4f03aff)" } },
            inactive_border = "rgba(1c2229ff)",
        },
    },
})`}
                  />
                </div>

                <div>
                  <SubHeading id="custom-binds">Custom keybindings</SubHeading>
                  <Prose>
                    <p>
                      Bindings use one function per action. The first argument is the
                      chord, the second is a dispatch from <code>hl.dsp</code>.
                    </p>
                  </Prose>
                  <CodeBlock
                    label="~/.config/hypr/hyprland.lua"
                    code={`-- Launch a specific application
hl.bind("SUPER + T", hl.dsp.exec_cmd("thunar"))

-- Move a window to workspace 5
hl.bind("SUPER + SHIFT + 5", hl.dsp.window.move({ workspace = 5 }))`}
                  />
                  <CodeBlock
                    label="Terminal"
                    code={`hyprctl reload`}
                  />
                  <Prose>
                    <p>
                      <code>hyprctl reload</code> reloads the compositor
                      configuration without closing applications. Autostart entries
                      are registered on <code>hyprland.start</code>, so a change there
                      applies on the next login.
                    </p>
                  </Prose>
                </div>
              </DocSection>

              <DocSection
                id="diagnostics"
                index="04"
                title="Diagnostics and recovery"
                summary="The image ships flr-doctor for a single read-only health report, and Hyprland and greetd both run on standard systemd units. Most session problems are visible from a text console."
              >
                <div>
                  <SubHeading id="flr-doctor">flr-doctor</SubHeading>
                  <Prose>
                    <p>
                      <code>flr-doctor</code> inspects the services, fonts, keyring,
                      and repository configuration that the desktop depends on, then
                      prints a summary of OK, WARN, and INFO findings. It changes
                      nothing on the system.
                    </p>
                  </Prose>
                  <CodeBlock label="Terminal" code={`flr-doctor`} />
                  <Prose>
                    <p>
                      A summary such as <code>flr-doctor: 14 OK, 1 WARN, 4 INFO</code>{" "}
                      means every required check passed and the remaining lines are
                      informational. A missing zram device is expected inside virtual
                      machines and does not affect the session.
                    </p>
                  </Prose>
                  <DataTable
                    head={["Check", "What it inspects"]}
                    rows={[
                      ["Session services", "PipeWire, WirePlumber, and the Hyprland portal"],
                      ["Fonts", "JetBrains Mono and the installed font aliases"],
                      ["Keyring", "The FluorineOS archive signing key"],
                      ["APT repository", "Reachability of the signed package archive"],
                      ["Hardware helpers", "zram swap and other optional devices"],
                    ]}
                  />
                </div>

                <div>
                  <SubHeading id="tty">Switch to a TTY</SubHeading>
                  <Prose>
                    <p>
                      When the session stops responding, switch to a text console
                      with <Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> + <Kbd>F3</Kbd> and log in
                      with the same account. Return to the graphical session with{" "}
                      <Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> + <Kbd>F1</Kbd>.
                    </p>
                    <p>
                      From the console, <code>flr-doctor</code> reports the service
                      state, and <code>journalctl -b -p err</code> lists errors from
                      the current boot.
                    </p>
                  </Prose>
                  <CodeBlock
                    label="Terminal"
                    code={`flr-doctor
journalctl -b -p err
systemctl restart greetd`}
                  />
                </div>

                <div>
                  <SubHeading id="safe-graphics">Safe Graphics</SubHeading>
                  <Prose>
                    <p>
                      If the desktop fails to appear, or the live session shows a
                      black screen on a virtual machine, select{" "}
                      <code>Safe Graphics / VM Software Render</code> at the boot
                      menu. That entry sets{" "}
                      <code>WLR_RENDERER_ALLOW_SOFTWARE=1</code>, which lets the
                      compositor render without hardware acceleration.
                    </p>
                    <p>
                      Installed systems keep the same option in the GRUB menu. Use it
                      once to reach a working session, then confirm that the kernel
                      driver for the GPU is loaded before removing the option.
                    </p>
                  </Prose>
                  <CodeBlock
                    label="Terminal"
                    code={`lspci -k | grep -A3 -E "VGA|3D"`}
                  />
                </div>

                <div>
                  <SubHeading id="updates">Package updates</SubHeading>
                  <Prose>
                    <p>
                      The signing key and deb822 source for the official repository
                      are installed by <code>fluorine-keyring</code>. Refresh the
                      index and upgrade in place; no reinstall is required between
                      minor releases.
                    </p>
                  </Prose>
                  <CodeBlock
                    label="Terminal"
                    code={`sudo apt update
sudo apt upgrade`}
                  />
                  <Prose>
                    <p>
                      Configuration files that you have edited are preserved during
                      upgrades. When a package ships a new default, APT reports the
                      conflict and offers to keep the local version.
                    </p>
                  </Prose>
                  <Note title="After an upgrade">
                    Log out and back in so that new compositor and bar settings load.
                    Run <code>flr-doctor</code> once more to confirm that services and
                    the repository are healthy.
                  </Note>
                </div>
              </DocSection>

              <div className="mt-14 border-t-[1.5px] border-hairline pt-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <IconTerminal className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <p className="text-[13px] leading-[1.65] text-muted">
                      Unresolved issues belong in the project tracker, with the
                      output of <code className="text-primary">flr-doctor</code> and
                      the relevant journal lines.
                    </p>
                  </div>
                  <Link
                    href="https://github.com/FluorineOS/fluorine/issues"
                    className="inline-flex shrink-0 items-center gap-2 border-[1.5px] border-hairline bg-surface px-3 py-2 text-[12px] font-medium text-primary transition-colors hover:border-accent"
                  >
                    <span>Open an issue</span>
                    <IconArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
