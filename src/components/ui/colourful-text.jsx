"use client";
import React from "react";
import { motion } from "framer-motion";

// Renk temaları
const colorThemes = {
  emerald: [
    "rgb(19, 231, 160)",   // Ana yeşil (Aurora ile uyumlu)
    "rgb(16, 185, 129)",   // Emerald
    "rgb(5, 150, 105)",    // Koyu yeşil
    "rgb(20, 184, 166)",   // Teal
    "rgb(13, 148, 136)",   // Koyu teal
    "rgb(6, 182, 212)",    // Turkuaz
  ],
  sky: [
    "rgb(14, 165, 233)",   // Sky
    "rgb(56, 189, 248)",   // Açık mavi
    "rgb(2, 132, 199)",    // Koyu mavi
    "rgb(3, 105, 161)",    // Daha koyu mavi
    "rgb(125, 211, 252)",  // Açık sky
    "rgb(2, 111, 170)",  // En açık sky
  ],
  purple: [
    "rgb(168, 85, 247)",   // Purple
    "rgb(139, 92, 246)",   // Violet
    "rgb(124, 58, 237)",   // Koyu mor
    "rgb(109, 40, 217)",   // Daha koyu mor
    "rgb(192, 132, 252)",  // Açık mor
    "rgb(216, 180, 254)",  // En açık mor
  ],
  orange: [
    "rgb(249, 115, 22)",   // Orange
    "rgb(234, 88, 12)",    // Koyu turuncu
    "rgb(251, 146, 60)",   // Açık turuncu
    "rgb(245, 158, 11)",   // Amber
    "rgb(217, 119, 6)",    // Koyu amber
    "rgb(253, 186, 116)",  // En açık turuncu
  ],
  red: [
    "rgb(239, 68, 68)",    // Red
    "rgb(220, 38, 38)",    // Koyu kırmızı
    "rgb(248, 113, 113)",  // Açık kırmızı
    "rgb(244, 63, 94)",    // Rose
    "rgb(225, 29, 72)",    // Koyu rose
    "rgb(251, 113, 133)",  // Açık rose
  ],
  indigo: [
    "rgb(99, 102, 241)",   // Indigo
    "rgb(79, 70, 229)",    // Koyu indigo
    "rgb(129, 140, 248)",  // Açık indigo
    "rgb(67, 56, 202)",    // Daha koyu indigo
    "rgb(165, 180, 252)",  // Daha açık indigo
    "rgb(140, 102, 226)",  // En açık indigo
  ]
};

export function ColourfulText({
  text,
  className = "",
  colorTheme = "emerald"
}) {
  // Tema renklerini al, eğer belirtilen tema yoksa emerald temasını kullan
  const colors = colorThemes[colorTheme] || colorThemes.emerald;

  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, [colors]);

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
