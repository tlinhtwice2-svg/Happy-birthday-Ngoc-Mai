import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const secretMessages = [
  "🎉 Mai tưởng gì? Chỉ là một nút bấm thôi. Nhưng thật ra... love Mai ~^^!",
  "😂 Tại sao em cứ bấm? Chị đã dặn đừng bấm rồi mà!",
  "🌟 Okay okay, phần thưởng bí mật: Chúc mừng sinh nhật thật vui vẻ nhó!.",
  "💌 Bí mật cuối: I love you so much ~ UwU",
  "🤫 Xin lỗi, nút này đã hết phần thưởng bí mật!",
];

export function SecretButton() {
  const [clickCount, setClickCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleClick = () => {
    const msg = secretMessages[clickCount % secretMessages.length];
    setCurrentMessage(msg);
    setShowMessage(true);
    setClickCount((c) => c + 1);
    setTimeout(() => setShowMessage(false), 3500);
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        className="fixed bottom-6 left-6 z-40 px-4 py-2 rounded-full text-xs"
        style={{
          background: "rgba(61,43,31,0.08)",
          border: "1px dashed rgba(201,111,136,0.4)",
          color: "#8B6B5A",
          fontFamily: "'Be Vietnam Pro', sans-serif",
          backdropFilter: "blur(4px)",
          cursor: "pointer",
        }}
        whileHover={{ scale: 1.05, background: "rgba(201,111,136,0.12)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        🤫 Đừng bấm vào đây
      </motion.button>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -10, x: "-50%" }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-16 left-1/2 z-50 max-w-xs w-full px-5 py-4 rounded-2xl text-center"
            style={{
              background: "#FFF8F0",
              border: "1.5px solid rgba(201,111,136,0.25)",
              boxShadow: "0 8px 32px rgba(201,111,136,0.2)",
              fontFamily: "'Be Vietnam Pro', sans-serif",
              color: "#3D2B1F",
              fontSize: "0.9rem",
              lineHeight: 1.6,
            }}
          >
            {currentMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
