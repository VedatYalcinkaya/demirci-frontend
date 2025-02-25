"use client";
import React from "react";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";

export const HeroHighlight = ({
  children,
  className,
  containerClassName
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY
  }) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      className={`relative h-[40rem] flex items-center justify-center w-full group ${containerClassName}`}
      onMouseMove={handleMouseMove}>
      <div
        className="absolute inset-0 bg-dot-thick-neutral-800 pointer-events-none" />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }} />
      <div className={`relative z-20 ${className}`}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={`relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-emerald-300 to-sky-300 dark:from-emerald-500 dark:to-sky-500 ${className}`}>
      {children}
    </motion.span>
  );
};
