import React from "react";

export function Overlay({ children }) {
  return (
    <div className="fixed inset-0 bg-black/88 z-[1000] flex items-center justify-center backdrop-blur-[12px] p-4 animate-in fade-in duration-200">
      {children}
    </div>
  );
}