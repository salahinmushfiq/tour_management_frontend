import React, { useState, useRef, useEffect, useCallback } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { Send, RotateCcw, Copy, Check } from "lucide-react";

/* ---------------------- MessageBubble Component ---------------------- */
const MessageBubble = ({ msg, idx, onToggleSources, onCopy, onRegenerate }) => {
  const isUser = msg.role === "user";
  const [copied, setCopied] = useState(false);
  const time = msg.timestamp
    ? new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  const handleCopyLocal = () => {
    onCopy(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={clsx("flex w-full mb-4", isUser ? "justify-end" : "justify-start")}>
      <div
        className={clsx(
          "relative group max-w-[85%] px-4 py-3 rounded-2xl transition-all duration-300",
          isUser
            ? "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-500/20"
            : "bg-slate-800/50 backdrop-blur-md border border-slate-700/50 text-slate-100 rounded-tl-none"
        )}
      >
        <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {msg.displayText ?? msg.content}
        </div>

        <div className={clsx("flex items-center gap-3 mt-2 border-t pt-2 border-white/10", 
          isUser ? "justify-end" : "justify-between")}>
          <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">
            {time}
          </span>

          {!isUser && (
            <div className="flex items-center gap-3">
              <button onClick={handleCopyLocal} className="hover:text-indigo-400 transition-colors">
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
              {msg._canRegenerate && (
                <button onClick={() => onRegenerate(msg)} className="hover:text-indigo-400 transition-colors">
                  <RotateCcw size={14} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sources Section */}
        {msg.sources?.length > 0 && !isUser && (
          <div className="mt-3">
            <button
              onClick={() => onToggleSources(idx)}
              className="text-[10px] font-black uppercase tracking-tighter text-indigo-400 hover:text-indigo-300"
            >
              {msg.showSources ? "× Hide Data" : "+ View Intelligence"}
            </button>
            <AnimatePresence>
              {msg.showSources && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 p-2 rounded bg-black/30 border border-white/5 text-[11px] text-slate-400 max-h-32 overflow-y-auto custom-scrollbar"
                >
                  {msg.sources.map((doc, i) => (
                    <div key={i} className="mb-2 last:mb-0 border-b border-white/5 pb-1 italic">
                      "{typeof doc === "string" ? doc : doc?.content?.text || "Reference doc"}"
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------------- AiAssistant Main Component ---------------------- */
const AiAssistant = ({ messages, setMessages, onMessagesChange }) => {
  const [sessionId, setSessionId] = useState(() => localStorage.getItem("trekbot_session_id"));
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);
  const streamTimers = useRef([]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = `${Math.min(150, ta.scrollHeight)}px`;
    }
  }, [input]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => () => streamTimers.current.forEach(t => clearTimeout(t)), []);

  useEffect(() => {
    if (onMessagesChange) onMessagesChange(messages);
  }, [messages, onMessagesChange]);

  const pushMessage = useCallback((msg) => setMessages(prev => [...prev, msg]), [setMessages]);

  const startFakeStream = useCallback((index, fullText, speed = 16) => {
    let i = 0;
    const chunk = () => {
      setMessages(prev => {
        const copy = [...prev];
        if (!copy[index]) return prev;
        copy[index].displayText = fullText.slice(0, i);
        return copy;
      });
      i++;
      if (i <= fullText.length) {
        const timer = setTimeout(chunk, speed);
        streamTimers.current.push(timer);
      } else {
        setMessages(prev => {
          const copy = [...prev];
          if (copy[index]) copy[index]._canRegenerate = true;
          return copy;
        });
      }
    };
    chunk();
  }, [setMessages]);

  useEffect(() => {
    if (!sessionId) return;
    const savedMessages = localStorage.getItem(`trekbot_messages_${sessionId}`);
    if (savedMessages) {
      try { setMessages(JSON.parse(savedMessages)); return; } catch (err) {}
    }
    const loadPreviousSession = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8001/chat/history/${sessionId}`);
        const data = await res.json();
        if (Array.isArray(data.history)) setMessages(data.history);
      } catch (err) {}
    };
    loadPreviousSession();
  }, [sessionId, setMessages]);

  useEffect(() => {
    if (messages.length > 0 && sessionId) {
      localStorage.setItem(`trekbot_messages_${sessionId}`, JSON.stringify(messages));
    }
  }, [messages, sessionId]);

  const sendQuestion = useCallback(async (questionText) => {
    if (!questionText.trim()) return;
    setLoading(true);
    pushMessage({ role: "user", content: questionText, timestamp: Date.now() });

    try {
      const res = await fetch("http://127.0.0.1:8001/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: questionText, session_id: sessionId, top_k: 3 }),
      });
      const data = await res.json();

      if (data.session_id && data.session_id !== sessionId) {
        setSessionId(data.session_id);
        localStorage.setItem("trekbot_session_id", data.session_id);
      }

      const assistantMsg = {
        role: "assistant",
        content: data.answer ?? "No information found.",
        displayText: "",
        sources: data.retrieved_docs || [],
        timestamp: Date.now(),
        showSources: false,
        parentQuestion: questionText,
      };

      setMessages(prev => {
        const newList = [...prev, assistantMsg];
        startFakeStream(newList.length - 1, assistantMsg.content);
        return newList;
      });
    } catch (err) {
      pushMessage({ role: "assistant", content: "Signal lost. Please retry.", isError: true, retry: () => sendQuestion(questionText) });
    } finally {
      setLoading(false);
    }
  }, [pushMessage, startFakeStream, sessionId]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    const q = input;
    setInput("");
    sendQuestion(q);
  };

  return (
    <div className="flex flex-col h-[500px] w-full bg-slate-950/40 rounded-xl overflow-hidden">
      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-2">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-20 text-center p-8">
            <div className="w-12 h-12 border border-dashed border-white rounded-full mb-4 animate-spin-slow" />
            <p className="text-xs uppercase tracking-[0.2em]">Awaiting Input...</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <MessageBubble
            key={idx}
            msg={msg}
            idx={idx}
            onToggleSources={(i) => setMessages(prev => prev.map((m, j) => i === j ? {...m, showSources: !m.showSources} : m))}
            onCopy={(m) => navigator.clipboard.writeText(m.content)}
            onRegenerate={(m) => sendQuestion(m.parentQuestion)}
          />
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800/40 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                />
              ))}
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900/80 border-t border-white/5 backdrop-blur-xl">
        <div className="relative flex items-end gap-2 bg-slate-800/50 border border-white/10 rounded-xl px-3 py-2 focus-within:border-blue-500/50 transition-colors">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Query Discovery intelligence..."
            className="flex-1 bg-transparent text-sm text-slate-200 outline-none py-1 resize-none placeholder:text-slate-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="p-2 rounded-lg bg-blue-500 text-white disabled:opacity-30 disabled:grayscale transition-all hover:bg-blue-600 active:scale-90"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;