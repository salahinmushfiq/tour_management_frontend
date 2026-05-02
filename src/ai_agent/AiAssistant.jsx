import React, { useState, useRef, useEffect } from "react";
import { Send, Database, Copy, Check, Sparkles, Terminal, MapPin, Calendar, Tag, Globe, Navigation } from "lucide-react";
import clsx from "clsx";

/* --- UTILITY: Enhanced Parsing Logic --- */
const parseTourData = (content) => {
  if (typeof content !== 'string') return { description: JSON.stringify(content) };
  
  const lines = content.split('\n').map(l => l.trim());
  
  const rawRoute = lines.find(l => l.startsWith("Route:"))?.replace("Route:", "") || "";
  
  // Regex to split "City Name (Lat, Long)" into readable parts
  // Matches: Location Name and the (lat, long) group
  const routeParts = rawRoute.split("→").map(part => {
    const match = part.match(/(.*?)\s*\((.*?)\)/);
    return match ? { name: match[1].trim(), coords: match[2].trim() } : { name: part.trim(), coords: null };
  });

  return {
    title: lines.find(l => l.startsWith("Tour:"))?.replace("Tour:", "") || "Intelligence Node",
    category: lines.find(l => l.startsWith("Category:"))?.replace("Category:", "") || "Discovery",
    start: routeParts[0] || { name: "Unknown" },
    end: routeParts[1] || { name: "Unknown" },
    price: lines.find(l => l.startsWith("Price:"))?.replace("Price:", "") || "",
    date: lines.find(l => l.startsWith("Date:"))?.replace("Date:", "") || "",
    description: lines.slice(lines.findIndex(l => l.startsWith("Description:")) + 1).join(" ").trim()
  };
};

/* --- UTILITY: Convert Score to Meaningful Labels --- */
const getRelevanceLabel = (score) => {
  const s = Number(score);
  if (s >= 4.5) return { label: "Exact Match", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
  if (s >= 3.5) return { label: "High Relevance", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" };
  return { label: "Related Result", color: "text-slate-400 bg-slate-400/10 border-slate-400/20" };
};

/* --- Component: The Intelligence Card --- */
const IntelligenceCard = ({ doc }) => {
  const tour = parseTourData(doc.content);
  const rel = getRelevanceLabel(doc.score);

  return (
    <div className="group relative p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-xl transition-all hover:shadow-2xl hover:border-blue-500/40">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest px-2 py-0.5 bg-blue-500/10 rounded-lg">
            {tour.category}
          </span>
          <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">{tour.title}</h4>
        </div>
        <div className={clsx("text-[9px] font-bold uppercase tracking-tighter px-2 py-1 rounded-full border", rel.color)}>
          {rel.label}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {/* Route Visualization */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <div className="w-0.5 h-4 border-l border-dashed border-slate-300 dark:border-slate-700" />
              <MapPin size={12} className="text-red-500" />
            </div>
            <div className="flex-1 text-[11px] font-medium space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-700 dark:text-slate-300">{tour.start.name}</span>
                <span className="text-[9px] font-mono text-slate-400">{tour.start.coords}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700 dark:text-slate-300">{tour.end.name}</span>
                <span className="text-[9px] font-mono text-slate-400">{tour.end.coords}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5">
            <Tag size={14} className="text-blue-500" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{tour.price}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5">
            <Calendar size={14} className="text-blue-500" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{tour.date}</span>
          </div>
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 italic bg-slate-50/50 dark:bg-white/5 p-3 rounded-xl">
        "{tour.description}"
      </p>
    </div>
  );
};

/* --- Component: Message Bubble --- */
const MessageBubble = ({ msg, onToggleSources }) => {
  const isUser = msg.role === "user";
  const [copied, setCopied] = useState(false);
  
  const timeStr = new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={clsx("flex flex-col mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300", isUser ? "items-end" : "items-start")}>
      <div className={clsx(
        "max-w-[90%] px-6 py-4 rounded-[2rem] text-sm leading-relaxed shadow-xl border transition-all",
        isUser 
          ? "bg-blue-600 border-blue-500 text-white rounded-tr-none" 
          : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-none font-medium"
      )}>
        {msg.content}
      </div>

      <div className={clsx("flex items-center gap-3 mt-2.5 px-3", isUser ? "flex-row-reverse" : "flex-row")}>
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400/80 dark:text-slate-500">
          {timeStr} • {isUser ? "USER_UPLINK" : `INTEL_CORE_${msg.intent || "QUERY"}`}
        </span>
        {!isUser && (
          <button onClick={handleCopy} className="text-slate-400 hover:text-blue-500 transition-colors">
            {copied ? <Check size={12} /> : <Copy size={12} />}
          </button>
        )}
      </div>

      {msg.retrieved_docs?.length > 0 && (
        <div className="mt-5 w-full pl-2">
          <button
            onClick={onToggleSources}
            className="group flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-md text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 transition-all border border-slate-200 dark:border-blue-500/20"
          >
            <Database size={14} className="group-hover:scale-110 transition-transform text-blue-500" />
            {msg.showSources ? "Hide Intelligence" : `Inspect ${msg.retrieved_docs.length} Source Points`}
          </button>
          
          {msg.showSources && (
            <div className="mt-4 grid gap-4 animate-in fade-in zoom-in-95 duration-300">
              {msg.retrieved_docs.map((doc, idx) => (
                <IntelligenceCard key={idx} doc={doc} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* --- Main Assistant Component --- */
const AiAssistant = ({ messages, setMessages }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    const session_id = localStorage.getItem("trek_session_id");
    setInput("");
    setLoading(true);

    const userMsg = { role: "user", content: userText, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch(`${import.meta.env.VITE_FASTAPI_URL}/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userText, session_id, top_k: 3 }),
      });

      const data = await res.json();
      if (data.session_id) localStorage.setItem("trek_session_id", data.session_id);

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
          retrieved_docs: data.retrieved_docs,
          intent: data.intent,
          timestamp: Date.now(),
          showSources: false
        }
      ]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Link unstable. Attempting reconnection...", timestamp: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-transparent">
      <div className="flex-1 overflow-y-auto p-5 space-y-2 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40">
            <div className="relative">
              <Globe size={48} className="text-blue-500 animate-pulse" />
              <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-20" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Global Search Ready</p>
          </div>
        )}
        
        {messages.map((m, i) => (
          <MessageBubble 
            key={i} 
            msg={m} 
            onToggleSources={() => {
              const updated = [...messages];
              updated[i].showSources = !updated[i].showSources;
              setMessages(updated);
            }} 
          />
        ))}
        
        {loading && (
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-3xl w-max shadow-lg border border-slate-100 dark:border-white/5 animate-pulse">
            <Navigation size={16} className="text-blue-500 animate-bounce" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Scanning Horizons...</span>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-6 bg-white dark:bg-[#0B0F1A] border-t border-slate-100 dark:border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="flex gap-3 p-2 rounded-[2rem] bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus-within:ring-4 ring-blue-500/10 transition-all">
          <input
            className="flex-1 bg-transparent px-4 py-2 text-sm outline-none dark:text-white placeholder:text-slate-400"
            placeholder="Search destination, tour, or history..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button 
            disabled={loading}
            onClick={handleSend}
            className="p-3 bg-blue-600 text-white rounded-[1.5rem] hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20 active:scale-90"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;