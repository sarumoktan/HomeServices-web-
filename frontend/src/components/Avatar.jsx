import React from "react";

export function Avatar({ src, name, size = "md", className = "" }) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl"
  }[size] || "w-10 h-10 text-sm";

  if (src) {
    return (
      <img
        src={src}
        alt={name || "Avatar"}
        className={`${sizeClasses} rounded-full object-cover bg-[#F4F3EE] ${className}`}
      />
    );
  }

  const initials = name
    ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "HS";

  return (
    <div className={`${sizeClasses} rounded-full bg-[#2E4CDB]/10 text-[#2E4CDB] font-semibold flex items-center justify-center select-none ${className}`}>
      {initials}
    </div>
  );
}