# FluorineOS Website

`Debian 13 Trixie | Hyprland 0.55+ | x86_64`

Official web portal and documentation interface for FluorineOS, built with Next.js,
TypeScript, and Tailwind CSS. The design reproduces the AMOLED Void visual language of the
desktop environment.

[Latest Release][releases] | [Main Repository][main] | [APT Repository][apt] | [Issues][issues]

> Looking for official FluorineOS ISO images? Download release media and verify SHA256
> checksums from the [FluorineOS/fluorine][main] repository.

## Design Tokens

The web interface enforces the exact color tokens and hairline border geometry defined by
the distribution design specification:

| Token | Hex | Role |
| --- | --- | --- |
| Void canvas | `#000000` | Pure black application and body canvas |
| Raised carbon | `#0A0D10` | Elevated surfaces, cards, and navigation panels |
| Inactive border | `#1C2229` | 1.5px hairline borders on cards and inputs |
| Reactive lime | `#B4F03A` | Focus states, active indicators, and primary CTAs |
| Deep moss | `#2A3812` | Text selection and active table rows |
| Primary text | `#E2E8F0` | High-contrast body typography |
| Muted text | `#6E7681` | Secondary descriptions and metadata labels |

## Local Development

Prerequisites: Node.js 20 or newer, and npm.

1. Clone the repository and install dependencies:

```sh
git clone https://github.com/FluorineOS/fluorine-website.git
cd fluorine-website
npm install
```

2. Start the local development server:

```sh
npm run dev
```

The site runs locally at `http://localhost:3000`.

3. Validate linting and production build:

```sh
npm run lint
npm run build
```

## Vercel Deployment

This project is configured for zero-config deployment on Vercel:

1. Import the `FluorineOS/fluorine-website` repository in the Vercel dashboard.
2. Vercel automatically detects the Next.js framework preset:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
3. Deploy without requiring custom environment variables.

## License

This repository is part of the FluorineOS project.

[main]: https://github.com/FluorineOS/fluorine
[releases]: https://github.com/FluorineOS/fluorine/releases/latest
[apt]: https://fluorineos.github.io/apt-repo
[issues]: https://github.com/FluorineOS/fluorine/issues
