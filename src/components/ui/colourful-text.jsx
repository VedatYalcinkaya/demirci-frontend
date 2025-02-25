"use client";
import React from "react";
import { motion } from "framer-motion";

export function ColourfulText({
  text,
  className = "",
}) {
  const colors = [
    "rgb(19, 231, 160)",   // Ana yeşil (Aurora ile uyumlu)
    "rgb(6, 182, 212)",    // Turkuaz
    "rgb(5, 150, 105)",    // Koyu yeşil
    "rgb(16, 185, 129)",   // Emerald
    "rgb(20, 184, 166)",   // Teal
    "rgb(13, 148, 136)",   // Koyu teal
  ];

  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return text.split("").map((char, index) => (
    <motion.span
      key={`${char}-${count}-${index}`}
      initial={{
        y: 0,
      }}
      animate={{
        color: currentColors[index % currentColors.length],
        y: [0, -2, 0],
        scale: [1, 1.02, 1],
        filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
        opacity: [1, 0.9, 1],
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.03,
      }}
      className={`inline-block whitespace-pre font-sans tracking-tight ${className}`}>
      {char}
    </motion.span>
  ));
}
