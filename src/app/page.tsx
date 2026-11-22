import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Qualities } from "@/components/Qualities";
import { Keybindings } from "@/components/Keybindings";
import { ArchitectureInstall } from "@/components/ArchitectureInstall";
import { Repositories } from "@/components/Repositories";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#E2E8F0] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Qualities />
        <Keybindings />
        <ArchitectureInstall />
        <Repositories />
      </main>
      <Footer />
    </div>
  );
}
