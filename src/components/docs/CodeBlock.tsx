"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "../Icons";

type CopyState = "idle" | "copied" | "failed";

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the selection-based fallback below.
  }

  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const succeeded = document.execCommand("copy");
    document.body.removeChild(area);
    return succeeded;
  } catch {
    return false;
  }
}

interface CodeBlockProps {
  label: string;
  code: string;
}

export function CodeBlock({ label, code }: CodeBlockProps) {
  const [state, setState] = useState<CopyState>("idle");

  const handleCopy = async () => {
    const succeeded = await copyText(code);
    setState(succeeded ? "copied" : "failed");
    window.setTimeout(() => setState("idle"), 2400);
  };

  return (
    <div className="mt-4 border-[1.5px] border-hairline bg-surface">
      <div className="flex items-center justify-between gap-3 border-b-[1.5px] border-hairline px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {label}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex h-7 items-center gap-1.5 border-[1.5px] bg-canvas px-2 font-mono text-[11px] transition-colors ${
            state === "copied"
              ? "border-accent text-accent"
              : state === "failed"
                ? "border-warning text-warning"
                : "border-hairline text-primary hover:border-accent hover:text-accent"
          }`}
        >
          {state === "copied" ? (
            <IconCheck className="h-3.5 w-3.5" />
          ) : (
            <IconCopy className="h-3.5 w-3.5" />
          )}
          <span>
            {state === "copied"
              ? "Copied"
              : state === "failed"
                ? "Select and copy"
                : "Copy"}
          </span>
        </button>
        <span aria-live="polite" className="sr-only">
          {state === "copied"
            ? `${label} copied to clipboard`
            : state === "failed"
              ? `${label} could not be copied. Select the text and copy it manually.`
              : ""}
        </span>
      </div>
      <pre className="overflow-x-auto px-3 py-3 text-[11px] leading-[1.65] text-primary sm:text-xs">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
