import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Qualities } from "@/components/Qualities";
import { InterfaceTour } from "@/components/InterfaceTour";
import { Keybindings } from "@/components/Keybindings";
import { ArchitectureInstall } from "@/components/ArchitectureInstall";
import { Repositories } from "@/components/Repositories";
import { Footer } from "@/components/Footer";

export default function Home() {
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
        <Hero />
        <Qualities />
        <InterfaceTour />
        <Keybindings />
        <ArchitectureInstall />
        <Repositories />
      </main>
      <Footer />
    </div>
  );
}
