"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { Check } from "lucide-react";

interface Props {
  moduleSlug: string;
  question: string;
}

export function ReflectionPrompt({ moduleSlug, question }: Props) {
  const addReflection = useUserStore((s) => s.addReflection);
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!value || saved) return;
    if (value.trim().length < 10) return;
    const timer = setTimeout(() => {
      addReflection({ moduleSlug, question, answer: value.trim() });
      setSaved(true);
    }, 800);
    return () => clearTimeout(timer);
  }, [value, saved, addReflection, moduleSlug, question]);

  return (
    <div className="my-8 rounded-xl border border-border bg-bg-card p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-serif text-sm shrink-0">
          ?
        </div>
        <h4 className="text-h3 text-text-primary">{question}</h4>
      </div>
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setSaved(false);
        }}
        placeholder="写下你的想法,至少 10 字会自动保存到「我的清单」..."
        className="w-full min-h-[100px] p-3 rounded-lg border border-border bg-bg-base text-text-primary text-[0.95rem] leading-relaxed resize-y focus:border-accent focus:outline-none"
        rows={4}
      />
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-text-muted">
          {value.length} 字 {value.length >= 20 && "· 字数已经足够引发思考"}
        </span>
        {saved && (
          <span className="text-xs text-data-1 flex items-center gap-1 font-medium">
            <Check className="w-3.5 h-3.5" />
            已加入「我的清单」
          </span>
        )}
      </div>
    </div>
  );
}
