import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const memories = [
  {
    year: "2006",
    age: "18 tháng",
    caption: "Ngày em chào đời, thế giới có thêm một thiên sứ.",
    emoji: "🍼",
    color: "#F2B5C5",
    bg: "https://i.postimg.cc/4y2SC85C/1783838456202-6993869936114346127-6993869936114346127-f1fe33ff9974c0409192b51b2e85cab6.jpg",
  },
  {
    year: "2007",
    age: "2 tuổi",
    caption: "Đáng yêu và tốt bụng^^",
    emoji: "🖍️",
    color: "#EDD5C0",
    bg: "https://i.postimg.cc/wBfzxkFs/1783838456308-6993869936114346127-6993869936114346127-660b6b07c4f48c238379e200e7ecce96.jpg" 
  },
  {
    year: "2010",
    age: "5 tuổi",
    caption: "Đôi mắt biết nói...",
    emoji: "🎒",
    color: "#B8D4E3",
    bg: "https://i.postimg.cc/3JBcHxtr/1783838567775-6993869936114346127-6993869936114346127-524aedda3993b6e1456f47fb19f69b38.jpg",
  },
  {
    year: "2023",
    age: "18 tuổi",
    caption: "Nàng thơ xinh đẹp động lòng người ~",
    emoji: "🌸",
    color: "#F5D5E8",
    bg: "https://i.postimg.cc/3JBcHxtr/1783838567775-6993869936114346127-6993869936114346127-524aedda3993b6e1456f47fb19f69b38.jpg" 
  },
  {
    year: "2024",
    age: "19 tuổi",
    caption: "Thanh xuân rực rỡ nhất, rạng ngời tựa ánh ban mai",
    emoji: "💐",
    color: "#D4E8D0",
    bg: "https://i.postimg.cc/Ss6G7g59/1784050578371-405972921289433378-2453321980956864395-c04beb160b18084a8611a396f0297823.jpg",
  },
  {
    year: "2025",
    age: "20 tuổi",
    caption: "Khi nàng công chúa bước ra khỏi thế giới cổ tích, tỏa sáng rực rỡ nhất giữa đời thường",
    emoji: "✨",
    color: "#C96F88",
    bg: "https://i.postimg.cc/FsWVZdPw/1784050578286-405972921289433378-2453321980956864395-9f284db9eb0a0d2c512e0c219ba3c296.jpg",
    highlight: true,
  },
];

function FilmHoles() {
  return (
    <div className="flex flex-col gap-3 py-2">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="rounded-sm"
          style={{ width: 14, height: 10, background: "rgba(61,43,31,0.15)", border: "1px solid rgba(61,43,31,0.1)" }}
        />
      ))}
    </div>
  );
}

function MemoryCard({ memory, index }: { memory: typeof memories[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative flex items-center gap-0 mb-12"
    >
      {/* Film strip side - left */}
      <div
        className="hidden md:flex flex-col items-center px-2 py-4 rounded-l-sm"
        style={{ background: "#2A1F14", minHeight: 200, width: 32 }}
      >
        <FilmHoles />
      </div>

      {/* Frame */}
      <motion.div
        style={{ y }}
        className={`flex flex-col md:flex-row items-stretch w-full ${isEven ? "" : "md:flex-row-reverse"} gap-0`}
      >
        {/* Photo side */}
        <div className="relative overflow-hidden md:w-1/2" style={{ minHeight: 240 }}>
          <img
            src={memory.bg}
            alt={`Kỷ niệm năm ${memory.year}`}
            className="w-full h-full object-cover"
            style={{ filter: "sepia(30%) saturate(0.8) brightness(0.92)", minHeight: 240 }}
          />
          {/* Film grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
              mixBlendMode: "multiply",
              opacity: 0.4,
            }}
          />
          {/* Year badge */}
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded"
            style={{
              background: "rgba(250,243,232,0.92)",
              fontFamily: "'Playfair Display', serif",
              color: "#3D2B1F",
              fontSize: "0.85rem",
              fontStyle: "italic",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(201,111,136,0.3)",
            }}
          >
            {memory.year} · {memory.age}
          </div>
        </div>

        {/* Text side */}
        <div
          className="flex flex-col justify-center p-8 md:w-1/2"
          style={{ background: memory.highlight ? "linear-gradient(135deg, #FAF3E8, #F5E0EE)" : "#FFF8F0" }}
        >
          <span style={{ fontSize: "2.5rem", marginBottom: "0.75rem", display: "block" }}>{memory.emoji}</span>
          <p
            className="leading-relaxed"
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              color: "#3D2B1F",
              fontSize: "1.05rem",
              lineHeight: 1.8,
            }}
          >
            {memory.caption}
          </p>
          {memory.highlight && (
            <p
              className="mt-4 italic"
              style={{ fontFamily: "'Playfair Display', serif", color: "#C96F88", fontSize: "0.95rem" }}
            >
              — Và chị muốn em biết điều đó.
            </p>
          )}
        </div>
      </motion.div>

      {/* Film strip side - right */}
      <div
        className="hidden md:flex flex-col items-center px-2 py-4 rounded-r-sm"
        style={{ background: "#2A1F14", minHeight: 200, width: 32 }}
      >
        <FilmHoles />
      </div>
    </motion.div>
  );
}

export function MemoryReel() {
  return (
    <section className="py-20 px-4" style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #FAF3E8 100%)" }}>
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.35em] uppercase mb-3" style={{ color: "#8B6B5A", fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            cuộn phim ký ức
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "2.2rem" }}>
            Những khoảnh khắc<br />
            <span style={{ fontStyle: "italic", color: "#C96F88" }}>đáng nhớ</span>
          </h2>
          <div className="mt-4 mx-auto" style={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, #C96F88, transparent)" }} />
        </motion.div>

        {/* Memory cards */}
        {memories.map((memory, i) => (
          <MemoryCard key={memory.year} memory={memory} index={i} />
        ))}
      </div>
    </section>
  );
}
