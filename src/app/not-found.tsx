import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { IconArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Page not found - FluorineOS",
  description:
    "The requested page does not exist. Return to the FluorineOS homepage or open the documentation.",
};

export default function NotFound() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-canvas text-primary">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:border-[1.5px] focus:border-accent focus:bg-canvas focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-primary"
      >
        Skip to content
      </a>
      <Navbar />

      <main id="main" className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 border-[1.5px] border-hairline bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
              Error 404
            </p>

            <h1 className="mt-6 text-balance text-4xl leading-[1.1] text-primary sm:text-5xl">
              Page not found.
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-[15px] leading-[1.65] text-muted">
              The address does not match a page on this site. Check the URL, or
              continue from the homepage or the documentation.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-accent-hover"
              >
                <span>Return home</span>
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center gap-2 border-[1.5px] border-hairline bg-surface px-5 py-3 text-sm font-medium text-primary transition-colors hover:border-accent"
              >
                <span>Open documentation</span>
              </Link>
            </div>

            <p className="mt-10 border-t-[1.5px] border-hairline pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              FluorineOS / 404
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
