import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import Contact from "@/components/landing/Contact";
import AIChatWidget from "@/components/landing/AIChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-orange-500/30 selection:text-orange-200">
      <Navbar />
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <Pricing />
      <Contact />

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-black text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} SoluGrow. All rights reserved.</p>
      </footer>

      <AIChatWidget />
    </main>
  );
}
