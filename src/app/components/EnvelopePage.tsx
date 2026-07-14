import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface EnvelopePageProps {
  onOpen: () => void;
}

export function EnvelopePage({ onOpen }: EnvelopePageProps) {
  const [clicked, setClicked] = useState(false);
  const [opening, setOpening] = useState(false);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    setOpening(true);
    setTimeout(onOpen, 1800);
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: "linear-gradient(135deg, #FAF3E8 0%, #F2E4D0 40%, #EDD5C0 100%)" }}
      animate={opening ? { opacity: 0, scale: 1.08 } : { opacity: 1 }}
      transition={{ duration: 0.9, delay: opening ? 0.9 : 0, ease: "easeInOut" }}
    >
      {/* Decorative dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              background: "#C96F88",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center mb-8"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        <p className="text-sm tracking-[0.35em] uppercase mb-2" style={{ color: "#8B6B5A" }}>
          một lá thư nhỏ
        </p>
        <h1 style={{ color: "#3D2B1F", fontSize: "2rem", fontStyle: "italic" }}>
          Gửi cho Mai...
        </h1>
      </motion.div>

      {/* Envelope */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
        onClick={handleClick}
        className="relative cursor-pointer select-none"
        style={{ width: 280, height: 200 }}
        whileHover={!clicked ? { y: -6, transition: { duration: 0.3 } } : {}}
      >
        {/* Envelope body */}
        <div
          className="absolute inset-0 rounded-lg shadow-lg"
          style={{
            background: "linear-gradient(160deg, #FFF8F0 60%, #FAF0E6 100%)",
            border: "1.5px solid rgba(180,130,100,0.25)",
            boxShadow: "0 8px 32px rgba(201,111,136,0.15), 0 2px 8px rgba(61,43,31,0.08)",
          }}
        />

        {/* Envelope bottom triangle (inside) */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "55%",
            background: "linear-gradient(160deg, #FAEADA 0%, #F5E4D0 100%)",
            clipPath: "polygon(0 100%, 50% 0%, 100% 100%)",
            bottom: 0,
          }}
        />

        {/* Left flap */}
        <div
          className="absolute bottom-0 left-0"
          style={{
            width: "50%",
            height: "100%",
            background: "linear-gradient(135deg, #F5E8D8 0%, #EDD8C8 100%)",
            clipPath: "polygon(0 0, 0 100%, 100% 100%)",
            opacity: 0.7,
          }}
        />

        {/* Right flap */}
        <div
          className="absolute bottom-0 right-0"
          style={{
            width: "50%",
            height: "100%",
            background: "linear-gradient(225deg, #F5E8D8 0%, #EDD8C8 100%)",
            clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
            opacity: 0.7,
          }}
        />

        {/* Top flap — animates open */}
        <motion.div
          className="absolute top-0 left-0 right-0 origin-top"
          style={{
            height: "50%",
            background: "linear-gradient(180deg, #FFF8F0 0%, #F5E8D8 100%)",
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            transformOrigin: "top center",
            borderRadius: "8px 8px 0 0",
          }}
          animate={opening ? { rotateX: -170, opacity: 0.2 } : { rotateX: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />

        {/* Wax seal */}
        <motion.div
          className="absolute flex items-center justify-center"
          style={{
            width: 44,
            height: 44,
            background: "radial-gradient(circle, #C96F88 0%, #A85572 100%)",
            borderRadius: "50%",
            left: "50%",
            top: "46%",
            transform: "translateX(-50%)",
            boxShadow: "0 2px 8px rgba(168,85,114,0.4)",
            zIndex: 10,
          }}
          animate={opening ? { scale: 0, opacity: 0 } : { scale: 1 }}
          transition={{ duration: 0.3, delay: opening ? 0.1 : 0 }}
        >
          <span style={{ color: "#FFF8F0", fontSize: "18px" }}>✦</span>
        </motion.div>

        {/* Letter peeking out */}
        <AnimatePresence>
          {opening && (
            <motion.div
              className="absolute left-4 right-4 rounded"
              style={{
                background: "#FFFDF8",
                border: "1px solid rgba(180,130,100,0.2)",
                height: 80,
                bottom: 20,
                zIndex: 5,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -50, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: clicked ? 0 : 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-8 text-sm tracking-widest"
        style={{ color: "#8B6B5A", fontFamily: "'Be Vietnam Pro', sans-serif" }}
      >
        ↓ chạm vào để mở ↓
      </motion.p>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 opacity-30" style={{ color: "#C96F88", fontSize: 20 }}>✦</div>
      <div className="absolute top-8 right-8 opacity-30" style={{ color: "#C96F88", fontSize: 20 }}>✦</div>
      <div className="absolute bottom-8 left-8 opacity-30" style={{ color: "#C96F88", fontSize: 14 }}>✦</div>
      <div className="absolute bottom-8 right-8 opacity-30" style={{ color: "#C96F88", fontSize: 14 }}>✦</div>
    </motion.div>
  );
}
