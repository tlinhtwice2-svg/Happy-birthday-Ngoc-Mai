import { useState, useRef } from "react";
import { motion } from "motion/react";

export function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    // In production, replace with actual audio file URL
    setPlaying((p) => !p);
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 rounded-2xl"
      style={{
        background: "rgba(255,248,240,0.92)",
        border: "1px solid rgba(201,111,136,0.2)",
        boxShadow: "0 4px 20px rgba(201,111,136,0.12)",
        backdropFilter: "blur(8px)",
      }}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.6, ease: "easeOut" }}
    >
      {/* Cassette icon */}
      <div className="relative" style={{ width: 36, height: 36 }}>
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
          <rect x="2" y="7" width="32" height="22" rx="3" fill="#F2E8DA" stroke="#C96F88" strokeWidth="1.5" />
          <rect x="5" y="10" width="26" height="16" rx="2" fill="none" stroke="rgba(201,111,136,0.4)" strokeWidth="1" />
          <circle cx="12" cy="18" r="4" fill="#EDD5C0" stroke="#C96F88" strokeWidth="1.2" />
          <circle cx="24" cy="18" r="4" fill="#EDD5C0" stroke="#C96F88" strokeWidth="1.2" />
          <circle cx="12" cy="18" r="1.5" fill="#C96F88" />
          <circle cx="24" cy="18" r="1.5" fill="#C96F88" />
          <rect x="14" y="16.5" width="8" height="3" rx="0.5" fill="#F5D5E0" />
          {/* Spinning reel animation */}
          {playing && (
            <>
              <line x1="12" y1="14" x2="12" y2="16" stroke="#C96F88" strokeWidth="1" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 12 18" to="360 12 18" dur="1s" repeatCount="indefinite" />
              </line>
              <line x1="24" y1="14" x2="24" y2="16" stroke="#C96F88" strokeWidth="1" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 24 18" to="360 24 18" dur="0.8s" repeatCount="indefinite" />
              </line>
            </>
          )}
        </svg>
      </div>

      <div className="flex flex-col" style={{ minWidth: 100 }}>
        <p
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            color: "#3D2B1F",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.05em",
          }}
        >
          Lời nhắn từ chị nè
        </p>
        {/* Fake waveform */}
        <div className="flex items-center gap-0.5 mt-1" style={{ height: 16 }}>
          {[4,7,5,9,6,11,8,5,10,7,4,8,6,9,5].map((h, i) => (
            <motion.div
              key={i}
              style={{
                width: 2,
                height: playing ? h : 3,
                background: playing ? "#C96F88" : "rgba(201,111,136,0.3)",
                borderRadius: 1,
                transition: "height 0.15s ease",
              }}
              animate={playing ? {
                height: [h * 0.5, h, h * 0.3, h * 0.8, h],
                transition: { duration: 0.6 + i * 0.05, repeat: Infinity, repeatType: "mirror" }
              } : {}}
            />
          ))}
        </div>
      </div>

      <button
        onClick={toggle}
        className="flex items-center justify-center rounded-full transition-all"
        style={{
          width: 32,
          height: 32,
          background: playing ? "#C96F88" : "rgba(201,111,136,0.15)",
          border: "1px solid rgba(201,111,136,0.3)",
          color: playing ? "#FFF8F0" : "#C96F88",
          fontSize: "0.75rem",
          cursor: "pointer",
        }}
        title={playing ? "Dừng" : "Phát"}
      >
        {playing ? "⏸" : "▶"}
      </button>
    </motion.div>
  );
}
