"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  question?: string;
  answer?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  image?: string;
  model?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  question = "What is the capital of France?",
  answer = "Paris",
  date = "Just now",
  image,
  model = "GPT-4",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-44 w-[24rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border border-white/5 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/10 hover:bg-muted/80 [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div className="!justify-between w-full">
        <div className="flex items-center gap-2">
          <span className="relative inline-block rounded-md bg-white/5 p-1 px-2 border border-white/5 text-[10px] font-bold uppercase tracking-wider text-white/40">
            {model}
          </span>
        </div>
        <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold">{date}</p>
      </div>

      <div className="!items-start !flex-col !gap-2 w-full flex-1 mt-0">
        {image === "placeholder" ? (
          <div className="relative w-full h-16 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-white/5 flex items-center justify-center">
            <div className="absolute inset-0 bg-white/5 mask-image-linear-to-b" />
            <Sparkles className="size-6 text-white/10" />
          </div>
        ) : image ? (
          <div className="relative w-full h-16 rounded-lg overflow-hidden border border-white/10 shrink-0">
            <img src={image} alt="Prompt Image" className="w-full h-full object-cover opacity-80" />
          </div>
        ) : (
          <div className="w-full space-y-2">
            <p className="text-sm font-medium text-white/90 line-clamp-3 leading-tight w-full">{question}</p>
            {/* Decorative skeleton lines to add visual density */}
            <div className="w-3/4 h-1.5 rounded-full bg-white/5" />
            <div className="w-1/2 h-1.5 rounded-full bg-white/5" />
          </div>
        )}

        <div className="flex items-center w-full mt-auto bg-white/5 p-2 rounded-md border border-white/5">
          <p className="text-xs text-white/70 line-clamp-1 w-full truncate font-mono">{answer}</p>
        </div>
      </div>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      className: "",
    },
    {
      className: "",
    },
    {
      className: "",
    },
  ];

  const displayCards = cards || defaultCards;
  // Double the cards for seamless loop
  const infiniteCards = [...displayCards, ...displayCards];

  return (
    <div className="flex flex-col h-[320px] w-full items-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] py-10">
      <motion.div
        className="flex flex-col gap-8 pb-8 items-center"
        animate={{
          y: "-50%",
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {infiniteCards.map((cardProps, index) => (
          <DisplayCard key={index} {...cardProps} className="shrink-0" />
        ))}
      </motion.div>
    </div>
  );
}
