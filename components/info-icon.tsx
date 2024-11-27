"use client";

import React, { useState, forwardRef } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Balancer } from "react-wrap-balancer";

const variants = {
  default: { bg: "#0A0A0A", text: "#A1A1A1", border: "#2E2E2E" },
  error: { bg: "#3C1618", text: "#FF6166", border: "#671E21" },
  ghost: { bg: "#202020", text: "#888888", border: "#2E2E2E" },
  success: { bg: "#10233D", text: "#3C7BBE", border: "#0D3868" },
  violet: { bg: "#2E1938", text: "#BF7AF0", border: "#4F2768" },
  cyan: { bg: "#062822", text: "#0AB7A5", border: "#053D35" },
  warning: { bg: "#341C00", text: "#F1A10D", border: "#352108" },
};

const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipProvider = TooltipPrimitive.Provider;

const TooltipContent = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ sideOffset = 5, className, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={`z-50 overflow-hidden rounded-md animate-in fade-in-0 zoom-in-95 bg-primary px-3 py-1.5 text-xs text-primary-foreground data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 ${className}`}
style={{
        maxWidth: '200px',
        width: 'auto',
      }}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface InfoIconProps {
  tooltip: string;
  variant?: "default" | "error" | "ghost" | "success" | "violet" | "cyan" | "warning";
  side?: "top" | "right" | "bottom" | "left";
}

const InfoIcon = ({ tooltip, variant = "default", side = "top" }: InfoIconProps) => {
  const { text, bg, border } = variants[variant];
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <button
            className={`rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[${text}]`}
            aria-expanded={open}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={text}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          style={{
            backgroundColor: bg,
            color: text,
            borderColor: border,
            borderWidth: 1,
          }}
        >
          <Balancer ratio={0.35} preferNative={false}>{tooltip}</Balancer>
          <TooltipPrimitive.Arrow
            style={{
              fill: bg,
            }}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InfoIcon;