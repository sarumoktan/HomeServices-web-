import React from "react";
import { Wrench, Sparkles, Zap, Droplet, Hammer, Paintbrush } from "lucide-react";

export function SvcIcon({ name = "", className = "w-5 h-5" }) {
  const lower = name.toLowerCase();
  if (lower.includes("clean")) return <Sparkles className={className} />;
  if (lower.includes("electric") || lower.includes("power")) return <Zap className={className} />;
  if (lower.includes("water") || lower.includes("plumb")) return <Droplet className={className} />;
  if (lower.includes("paint")) return <Paintbrush className={className} />;
  if (lower.includes("carpentry") || lower.includes("wood")) return <Hammer className={className} />;
  return <Wrench className={className} />;
}