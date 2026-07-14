import { motion } from "motion/react";

const navItems = [
  { label: "Ký ức", href: "#memories" },
  { label: "Lá thư", href: "#letter" },
  { label: "Góc riêng", href: "#safe-space" },
];

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
      style={{ background: "linear-gradient(160deg, #FAF3E8 0%, #F5E8D8 50%, #FAF3E8 100%)" }}
    >
      {/* Large decorative text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ opacity: 0.04 }}
      >
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(8rem, 30vw, 22rem)", color: "#3D2B1F", whiteSpace: "nowrap" }}>
          Em gái
        </span>
      </div>

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="absolute top-8 flex gap-8"
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              color: "#8B6B5A",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#C96F88"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#8B6B5A"; }}
          >
            {item.label}
          </a>
        ))}
      </motion.nav>

      <div className="relative z-10 text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
        >
          <p
            className="text-sm tracking-[0.4em] uppercase mb-4"
            style={{ color: "#8B6B5A", fontFamily: "'Be Vietnam Pro', sans-serif" }}
          >
            một ngày rất đặc biệt
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#3D2B1F",
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            lineHeight: 1.2,
          }}
        >
          Chúc mừng sinh nhật<br />
          <motion.span
            style={{ color: "#C96F88", fontStyle: "italic" }}
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            em gái yêu ✦
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-6"
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            color: "#8B6B5A",
            fontSize: "1rem",
            lineHeight: 1.8,
          }}
        >
          Cuộn xuống để bắt đầu một hành trình nhỏ —<br />
          những ký ức, những lời chưa nói, và một nơi chỉ dành cho em.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", color: "#8B6B5A", fontSize: "0.75rem", letterSpacing: "0.15em" }}>
            cuộn xuống
          </p>
          <motion.div
            style={{ width: 1, height: 40, background: "linear-gradient(180deg, #C96F88, transparent)" }}
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Corner ornaments */}
      {[
        { pos: "top-8 left-8", size: 20, delay: 0.8 },
        { pos: "top-8 right-8", size: 14, delay: 1.0 },
        { pos: "bottom-12 left-8", size: 14, delay: 1.2 },
        { pos: "bottom-12 right-8", size: 20, delay: 0.9 },
      ].map((ornament, i) => (
        <motion.div
          key={i}
          className={`absolute ${ornament.pos}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: ornament.delay, duration: 1 }}
          style={{ color: "#C96F88", fontSize: ornament.size }}
        >
          ✦
        </motion.div>
      ))}
    </section>
  );
}
