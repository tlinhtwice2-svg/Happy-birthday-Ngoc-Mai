import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FloatingParticles } from "./components/FloatingParticles";
import { EnvelopePage } from "./components/EnvelopePage";
import { HeroSection } from "./components/HeroSection";
import { MemoryReel } from "./components/MemoryReel";
import { TypingLetter } from "./components/TypingLetter";
import { SafeSpace } from "./components/SafeSpace";
import { ClosingPromise } from "./components/ClosingPromise";
import { SecretButton } from "./components/SecretButton";

export default function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  return (
    <div className="relative min-h-screen" style={{ background: "#FAF3E8" }}>
      <FloatingParticles />

      <AnimatePresence>
        {!envelopeOpened && (
          <EnvelopePage onOpen={() => setEnvelopeOpened(true)} />
        )}
      </AnimatePresence>

      {envelopeOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />

          <div id="memories">
            <MemoryReel />
          </div>

          <div id="letter">
            <TypingLetter />
          </div>

          <div id="safe-space">
            <SafeSpace />
          </div>

          <ClosingPromise />

          <footer
            className="py-8 text-center"
            style={{ background: "#2A1F14" }}
          >
            <p
              style={{
                fontFamily: "'Dancing Script', cursive",
                color: "rgba(242,232,218,0.4)",
                fontSize: "0.85rem",
              }}
            >
              Làm với ❤️ — dành riêng cho em
            </p>
          </footer>
        </motion.div>
      )}

      {envelopeOpened && <SecretButton />}
    </div>
  );
}
