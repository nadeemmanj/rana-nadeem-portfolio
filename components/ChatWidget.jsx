"use client";
// Floating chat widget: circular button bottom-right (above BackToTop).
// Answers from chatFaq via keyword matching (case-insensitive includes).
import { useEffect, useRef, useState } from "react";
import { chatFaq } from "../data/portfolio.js";

const FALLBACK =
  "I'm Rana's assistant — ask me about his skills, services, projects or experience!";

function findAnswer(input) {
  const q = input.toLowerCase();
  const hit = (chatFaq ?? []).find((f) =>
    (f.keywords ?? []).some((k) => q.includes(String(k).toLowerCase()))
  );
  return hit ? hit.answer : FALLBACK;
}

function ChatIcon() {
  // Reference-style chat icon: speech bubble with three dots
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <circle cx="8.5" cy="11.5" r="0.4" fill="currentColor" />
      <circle cx="12" cy="11.5" r="0.4" fill="currentColor" />
      <circle cx="15.5" cy="11.5" r="0.4" fill="currentColor" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showChips, setShowChips] = useState(false); // quick questions pehle chhupe rehte hain
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm Rana's assistant 👋 Ask me about his skills, services, projects or experience." },
  ]);
  const listRef = useRef(null);

  // Auto-scroll: naya message aate hi list khud sab se neeche chali jaye
  // (user ko mouse se scroll na karna pare)
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = (raw) => {
    const text = raw.trim();
    if (!text) return;
    const answer = findAnswer(text);
    setMessages((m) => [...m, { from: "user", text }, { from: "bot", text: answer }]);
    setInput("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const chips = (chatFaq ?? []).slice(0, 3);

  return (
    <>
      {/* Chat button: sits above the BackToTop button */}
      <button
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-[#bfdbfe] via-[#3b82f6] to-[#1d4ed8] text-[#070d1f] shadow-[0_0_30px_rgba(59,130,246,.5)] transition-transform hover:scale-110"
      >
        {open ? <span className="text-2xl font-bold">×</span> : <ChatIcon />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-40 right-6 z-40 flex max-h-[min(600px,calc(100dvh-15rem))] w-80 max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-[#1e2c52] bg-[#0e1830] shadow-[0_0_40px_rgba(59,130,246,.35)]">
          {/* Header */}
          <div className="bg-linear-to-r from-[#1d4ed8] via-[#3b82f6] to-[#1d4ed8] px-4 py-3">
            <p className="font-bold text-white">Rana's Assistant</p>
            <p className="flex items-center gap-1.5 text-xs text-[#dbe7ff]">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
              Online & ready to help
            </p>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.from === "bot"
                    ? "self-start bg-[#16244a] text-[#e8eefc]"
                    : "self-end bg-linear-to-r from-[#3b82f6] to-[#1d4ed8] text-white"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Quick questions — pehle chhupe hote hain;
              is button par click karne se khulte hain */}
          {chips.length > 0 && (
            <div className="px-4 pb-2">
              <button
                type="button"
                onClick={() => setShowChips((v) => !v)}
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-300 transition-colors hover:text-blue-200"
              >
                <span>❓ Quick Questions</span>
                <span className={`transition-transform duration-300 ${showChips ? "rotate-180" : ""}`}>▾</span>
              </button>
              {showChips && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {chips.map((f) => (
                    <button
                      key={f.question}
                      onClick={() => { send(f.question); setShowChips(false); }}
                      className="rounded-full border border-[#3b82f6] px-3 py-1 text-xs text-[#93a1c0] transition-colors hover:bg-[#3b82f6] hover:text-white"
                    >
                      {f.question}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Input */}
          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-[#1e2c52] p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 rounded-full border border-[#1e2c52] bg-[#070d1f] px-4 py-2 text-sm text-[#e8eefc] placeholder-[#5b6b8c] focus:border-[#3b82f6] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#3b82f6] to-[#1d4ed8] text-white transition-opacity disabled:opacity-40"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
