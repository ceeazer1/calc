"use client";

import { cn } from "@/lib/utils";
import {
  Sparkles,
  History,
  Dot,
  TerminalSquare,
  Settings2,
  Image as ImageIcon,
} from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg">{description}</p>
      <p className="text-muted-foreground">{date}</p>
    </div>
  );
}

interface ModelSettingsCardProps {
  className?: string;
  gptModel: string;
  tokenAmount: string;
  onModelChange: (value: string) => void;
  onTokenChange: (value: string) => void;
}

function ModelSettingsCard({
  className,
  gptModel,
  tokenAmount,
  onModelChange,
  onTokenChange,
}: ModelSettingsCardProps) {
  const modelOptions = [
    { value: "gpt-5.0", label: "GPT 5.0" },
    { value: "gpt-5.1", label: "GPT 5.1" },
    { value: "gpt-5.2", label: "GPT 5.2" },
    { value: "gpt-5-mini", label: "GPT 5 mini" },
    { value: "gpt-nano", label: "GPT nano" },
  ];
  const tokenOptions = [
    { value: "1000", label: "1k" },
    { value: "2000", label: "2k" },
    { value: "4000", label: "4k" },
    { value: "8000", label: "8k" },
  ];

  return (
    <div
      className={cn(
        "relative flex h-full w-full select-none flex-col rounded-xl border border-white/10 bg-[#0e1320]/75 backdrop-blur-xl px-6 py-5 shadow-[0_20px_80px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-500/10 p-2 border border-blue-400/20">
            <Settings2 className="size-4 text-blue-200" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-medium text-white/90">Model Settings</div>
            <div className="text-[11px] text-white/40">Configure inference</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-white/40">
          <Dot className="size-6 text-emerald-300/70 -ml-2" />
          Live
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-white/10 bg-black/20 p-4">
          <div className="text-xs font-medium text-white/70 mb-2">GPT Model</div>
          <div className="flex flex-wrap gap-2">
            {modelOptions.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => onModelChange(m.value)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs border transition-colors",
                  gptModel === m.value
                    ? "border-blue-400/40 bg-blue-500/15 text-blue-100"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/20 p-4">
          <div className="text-xs font-medium text-white/70 mb-2">Max Tokens</div>
          <div className="flex flex-wrap gap-2">
            {tokenOptions.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => onTokenChange(t.value)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs border transition-colors",
                  tokenAmount === t.value
                    ? "border-blue-400/40 bg-blue-500/15 text-blue-100"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface PromptHistoryCardProps {
  className?: string;
  prompts: Array<{ prompt: string; answer: string; kind?: "image" | "text" }>;
}

function PromptHistoryCard({
  className,
  prompts,
}: PromptHistoryCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full select-none flex-col rounded-xl border border-white/10 bg-[#0e1320]/75 backdrop-blur-xl px-6 py-5 shadow-[0_20px_80px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-500/10 p-2 border border-blue-400/20">
            <History className="size-4 text-blue-200" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-medium text-white/90">Prompt History</div>
            <div className="text-[11px] text-white/40">Recent interactions</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-white/40">
          <TerminalSquare className="size-4 text-white/35" />
          Session A
        </div>
      </div>
      <div className="space-y-3">
        {prompts.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-white/10 bg-black/20 p-4 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2 text-[11px] text-white/50 mb-1">
              <span>Prompt</span>
              {item.kind === "image" ? (
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
                  Image
                </span>
              ) : null}
            </div>
            <div className="flex items-start gap-3 mb-2">
              {item.kind === "image" ? (
                <div className="h-12 w-12 shrink-0 rounded-lg border border-white/10 bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-purple-500/10 flex items-center justify-center">
                  <ImageIcon className="size-5 text-blue-100/80" />
                </div>
              ) : null}
              <div className="text-sm text-white/90 leading-snug">{item.prompt}</div>
            </div>
            <div className="text-[11px] text-white/50 mb-1">Answer</div>
            <div className="text-sm text-white/70 leading-snug">{item.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
  showDashboard?: boolean;
  gptModel?: string;
  tokenAmount?: string;
  onModelChange?: (value: string) => void;
  onTokenChange?: (value: string) => void;
  prompts?: Array<{ prompt: string; answer: string; kind?: "image" | "text" }>;
}

export default function DisplayCards({ 
  cards, 
  showDashboard = false,
  gptModel = "gpt-5.2",
  tokenAmount = "2000",
  onModelChange,
  onTokenChange,
  prompts = [],
}: DisplayCardsProps) {
  const defaultCards = [
    {
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  if (showDashboard) {
    const dashboardPrompts = prompts.length > 0 ? prompts : [
      {
        kind: "image" as const,
        prompt: "Photo: Solve 2x + 5 = 15",
        answer: "x = 5",
      },
      {
        kind: "text" as const,
        prompt: "Differentiate: x² + 3x − 5",
        answer: "2x + 3",
      },
    ];

    return (
      <div className="w-full max-w-[940px]">
        <div className="rounded-2xl border border-white/10 bg-[#0b1020]/60 backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.65)] overflow-hidden">
          {/* App chrome */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28ca42]" />
              </div>
              <div className="text-xs text-white/60">CalcAI Dashboard • Preview</div>
            </div>
            <div className="text-xs text-white/40">hub.calcai.cc</div>
          </div>

          {/* App body */}
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-h-[320px]">
              <ModelSettingsCard
                gptModel={gptModel}
                tokenAmount={tokenAmount}
                onModelChange={onModelChange || (() => {})}
                onTokenChange={onTokenChange || (() => {})}
              />
              <PromptHistoryCard prompts={dashboardPrompts} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}

