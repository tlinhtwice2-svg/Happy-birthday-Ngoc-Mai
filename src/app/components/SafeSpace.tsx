import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const moods = [
  {
    id: "happy",
    emoji: "🌸",
    label: "Khi em vui",
    color: "#F2B5C5",
    bg: "linear-gradient(135deg, #FFF0F5 0%, #FAE0EC 100%)",
    border: "rgba(201,111,136,0.3)",
    content: [
      { type: "text", value: "Em xứng đáng được vui. Đừng cảm thấy có lỗi vì hạnh phúc." },
      { type: "text", value: "Những ngày em cười nhiều, nhà mình sáng hơn cả một bóng đèn 100W." },
      { type: "funny", value: "📸 Nhớ chụp ảnh lại để sau này có bằng chứng mà dìm hàng nhau." },
      { type: "text", value: "Chúng ta là những chi của đồng một thể. " },
    ],
  },
  {
    id: "tired",
    emoji: "🌙",
    label: "Khi em mệt mỏi",
    color: "#B8D4E3",
    bg: "linear-gradient(135deg, #F0F7FB 0%, #DFF0F8 100%)",
    border: "rgba(100,160,200,0.3)",
    content: [
      { type: "text", value: "Mệt thì được phép dừng lại. Không ai chạy marathon mà không được uống nước." },
      { type: "text", value: "Có những ngày mà chỉ cần thở và tồn tại đã là đủ rồi. Em đủ rồi." },
      { type: "funny", value: "🛋️ Nằm ra. Đắp chăn. Xem phim. Không cần giải thích với ai hết." },
      { type: "text", value: "Khi em sẵn sàng, chị vẫn ở đây. Không phán xét, không vội vàng." },
    ],
  },
  {
    id: "motivation",
    emoji: "⚡",
    label: "Khi em cần động lực",
    color: "#D4C5F0",
    bg: "linear-gradient(135deg, #F8F5FF 0%, #EDE5FF 100%)",
    border: "rgba(160,130,210,0.3)",
    content: [
      { type: "text", value: "Em biết không? Có những thứ em làm được mà không cần ai nhắc nhở. Đó là sức mạnh thật sự." },
      { type: "funny", value: "💪 Nhớ hồi bé em ngã xe đạp bao nhiêu lần mà vẫn tập tiếp không? Tinh thần đó vẫn còn đó." },
      { type: "text", value: "Không cần phải hoàn hảo. Chỉ cần bắt đầu — dù chỉ là bước nhỏ nhất." },
      { type: "text", value: "Gia đình mình tin em. Và chị — luôn luôn — tin em." },
    ],
  },
];

function MoodCard({ mood }: { mood: typeof moods[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: open ? mood.bg : "#FFF8F0",
        border: `1.5px solid ${open ? mood.border : "rgba(180,130,100,0.15)"}`,
        boxShadow: open ? "0 8px 32px rgba(61,43,31,0.08)" : "0 2px 8px rgba(61,43,31,0.04)",
        transition: "box-shadow 0.3s, background 0.4s, border 0.3s",
      }}
      onClick={() => setOpen((o) => !o)}
    >
      <motion.div layout className="flex items-center gap-4 p-6">
        <span style={{ fontSize: "2rem" }}>{mood.emoji}</span>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#3D2B1F",
            fontSize: "1.2rem",
            fontStyle: open ? "italic" : "normal",
            transition: "font-style 0.2s",
          }}
        >
          {mood.label}
        </h3>
        <motion.span
          className="ml-auto"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ color: "#8B6B5A", fontSize: "1.2rem" }}
        >
          ↓
        </motion.span>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="px-6 pb-8 pt-0 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
              <div className="h-px" style={{ background: `rgba(${mood.color}, 0.3)`, borderTop: `1px solid ${mood.border}` }} />
              {mood.content.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item.type === "funny" ? (
                    <div
                      className="p-4 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        border: `1px dashed ${mood.border}`,
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        color: "#5A4035",
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                      }}
                    >
                      {item.value}
                    </div>
                  ) : (
                    <p
                      style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        color: "#3D2B1F",
                        fontSize: "1rem",
                        lineHeight: 1.8,
                      }}
                    >
                      {item.value}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function SafeSpace() {
  return (
    <section className="py-20 px-4" style={{ background: "linear-gradient(180deg, #F5EAD8 0%, #FAF3E8 100%)" }}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.35em] uppercase mb-3" style={{ color: "#8B6B5A", fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            góc riêng của Mai
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "2.2rem" }}>
            Nơi này luôn<br />
            <span style={{ fontStyle: "italic", color: "#C96F88" }}>dành cho Mai</span>
          </h2>
          <div className="mt-4 mx-auto" style={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, #C96F88, transparent)" }} />
          <p
            className="mt-5 max-w-sm mx-auto"
            style={{ fontFamily: "'Be Vietnam Pro', sans-serif", color: "#8B6B5A", fontSize: "0.9rem", lineHeight: 1.7 }}
          >
            Nhấn vào bất kỳ cảm xúc nào — chị đã chuẩn bị sẵn một chút gì đó cho em.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {moods.map((mood, i) => (
            <motion.div
              key={mood.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              <MoodCard mood={mood} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
