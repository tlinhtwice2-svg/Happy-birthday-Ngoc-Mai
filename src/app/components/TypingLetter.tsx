import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const letterParagraphs = [
  "Mai ơi,",
  "Chị không giỏi văn vẻ, chỉ muốn nói là chị rất tự hào khi có một cô em gái vừa xinh đẹp, vừa sống tích cực như Mai.",
  "Cuối cùng cô bé ngày nào giờ đã lớn lên thật hạnh phúc và xinh đẹp. Thật cảm tạ ông Trời đã cho em lớn lên thật bình an đến ngày hôm nay.",
  "Chị rất vui khi chúng ta là chị em của nhau, chị thật hạnh phúc là nhiều lắm về em khi em sống thật khỏe mạnh và tích cực mỗi ngày. ",
  "Chúc mừng sinh nhật Mai. Hãy sống thật sự — thật vui, thật ý nghĩa, và thật khỏe mạnh để chúng ta có thể nắm tay nhau đi chơi thật nhiều nhé",
  "Yêu Mai nhiều lắm.",
  "— Linh.",
];

function LetterParagraph({ text, delay, active, completed, onDone }: {
  text: string;
  delay: number;
  active: boolean;
  completed: boolean;
  onDone: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const indexRef = useRef(0);

  // Trigger start typing after delay when active
  useEffect(() => {
    if (active && !startTyping) {
      const t = setTimeout(() => setStartTyping(true), delay);
      return () => clearTimeout(t);
    }
  }, [active, delay, startTyping]);

  // Run the typing animation
  useEffect(() => {
    if (!active || !startTyping || completed) {
      return;
    }

    indexRef.current = 0;
    setDisplayed("");
    setDone(false);

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 22);

    return () => {
      clearInterval(interval);
    };
  }, [active, startTyping, completed, text]);

  // Trigger onDone when done typing
  useEffect(() => {
    if (active && done && !completed) {
      onDone();
    }
  }, [active, done, completed, onDone]);

  const isSignature = text.startsWith("—");
  const isGreeting = text === "Mai ơi," || text === "Em ơi,";

  const displayText = completed ? text : displayed;

  return (
    <p
      className="mb-5"
      style={{
        fontFamily: isSignature || isGreeting ? "'Dancing Script', cursive" : "'Be Vietnam Pro', sans-serif",
        fontSize: isGreeting ? "1.6rem" : isSignature ? "1.4rem" : "1.05rem",
        color: isGreeting ? "#C96F88" : isSignature ? "#8B6B5A" : "#3D2B1F",
        lineHeight: 1.9,
        minHeight: "1.5em",
      }}
    >
      {displayText}
      {active && !done && startTyping && (
        <span
          className="inline-block ml-0.5 animate-pulse"
          style={{ width: 2, height: "1em", background: "#C96F88", verticalAlign: "text-bottom", borderRadius: 1 }}
        />
      )}
    </p>
  );
}

export function TypingLetter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDone = (index: number) => {
    setActiveIndex((prev) => {
      if (index === prev) {
        return prev + 1;
      }
      return prev;
    });
  };

  return (
    <section className="py-20 px-4" style={{ background: "linear-gradient(180deg, #FAF3E8 0%, #F5EAD8 100%)" }}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.35em] uppercase mb-3" style={{ color: "#8B6B5A", fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            lá thư gửi em
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "2.2rem" }}>
            Những điều chị<br />
            <span style={{ fontStyle: "italic", color: "#C96F88" }}>muốn nói từ lâu</span>
          </h2>
          <div className="mt-4 mx-auto" style={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, #C96F88, transparent)" }} />
        </motion.div>

        {/* Paper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          ref={ref}
          className="relative p-10 rounded-lg"
          style={{
            background: "#FFFDF8",
            border: "1px solid rgba(180,130,100,0.2)",
            boxShadow: "0 4px 32px rgba(201,111,136,0.08), 0 1px 4px rgba(61,43,31,0.05)",
          }}
        >
          {/* Ruled lines */}
          <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
            {[...Array(18)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0"
                style={{
                  top: `${80 + i * 38}px`,
                  height: 1,
                  background: "rgba(180,130,100,0.08)",
                }}
              />
            ))}
            {/* Left margin line */}
            <div
              className="absolute top-0 bottom-0"
              style={{ left: 56, width: 1, background: "rgba(201,111,136,0.15)" }}
            />
          </div>

          {/* Date */}
          <p
            className="text-right mb-8"
            style={{
              fontFamily: "'Dancing Script', cursive",
              color: "#8B6B5A",
              fontSize: "1rem",
            }}
          >
            Ngày sinh nhật em, 2026
          </p>

          <div className="pl-4">
            {letterParagraphs.map((para, i) => (
              <LetterParagraph
                key={i}
                text={para}
                delay={i === 0 ? 300 : 200}
                active={inView && i === activeIndex}
                completed={i < activeIndex}
                onDone={() => handleDone(i)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
