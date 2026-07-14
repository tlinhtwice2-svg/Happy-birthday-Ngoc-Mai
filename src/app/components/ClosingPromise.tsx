import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function ClosingPromise() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative py-28 px-4 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #3D2B1F 0%, #5A3D30 60%, #3D2B1F 100%)" }}
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(201,111,136,0.12) 0%, transparent 70%)",
            top: -100,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 300,
            height: 300,
            background: "radial-gradient(circle, rgba(184,212,227,0.08) 0%, transparent 70%)",
            bottom: -50,
            right: "10%",
          }}
        />
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        <p
          className="text-sm tracking-[0.35em] uppercase mb-6"
          style={{ color: "rgba(242,232,218,0.5)", fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          lời hứa của chị
        </p>

        <blockquote
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#F2E8DA",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            lineHeight: 1.5,
            fontStyle: "italic",
          }}
        >
          "Dù em có lớn đến đâu, dù em bay xa đến đâu — khi ngoảnh lại, chị vẫn ở đó."
        </blockquote>

        <div className="mt-8 mx-auto" style={{ width: 60, height: 1, background: "rgba(201,111,136,0.5)" }} />

        <p
          className="mt-8 leading-relaxed"
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            color: "rgba(242,232,218,0.75)",
            fontSize: "1rem",
            lineHeight: 1.9,
          }}
        >
          Không phải để kìm em lại —<br />
          mà để em biết rằng luôn có người nhìn em tiến về phía trước<br />
          với ánh mắt đầy tự hào.
        </p>

        <motion.div
          className="mt-14 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span style={{ fontSize: "2.5rem" }}>🎂</span>
          <p
            style={{
              fontFamily: "'Dancing Script', cursive",
              color: "#C96F88",
              fontSize: "1.8rem",
            }}
          >
            Chúc mừng sinh nhật em!
          </p>
          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              color: "rgba(242,232,218,0.5)",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              marginTop: "0.25rem",
            }}
          >
            Với tất cả tình yêu của chị
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
