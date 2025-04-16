"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ColourfulText({ text }: { text: string }) {
  // const colors = [
  //   "rgb(131, 179, 32)",
  //   "rgb(47, 195, 106)",
  //   "rgb(42, 169, 210)",
  //   "rgb(4, 112, 202)",
  //   "rgb(107, 10, 255)",
  //   "rgb(183, 0, 218)",
  //   "rgb(218, 0, 171)",
  //   "rgb(230, 64, 92)",
  //   "rgb(232, 98, 63)",
  //   "rgb(249, 129, 47)",
  // ];
  const colors = [
    "rgb(255, 255, 255)",  // Pure white
    "rgb(245, 245, 245)",  // Very light gray
    "rgb(230, 230, 230)",  // Light gray
    "rgb(210, 210, 210)",  // Soft gray
    "rgb(190, 190, 190)",  // Medium-light gray
    "rgb(170, 170, 170)",  // Neutral gray
    "rgb(150, 150, 150)",  // Slightly darker gray
    "rgb(130, 130, 130)",  // Medium gray
    "rgb(110, 110, 110)",  // Medium-dark gray
    "rgb(90, 90, 90)",     // Darker gray
  ];

  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 5000);

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
        y: [0, -3, 0],
        scale: [1, 1.01, 1],
        filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      className="inline-block whitespace-pre font-sans tracking-tight"
    >
      {char}
    </motion.span>
  ));
}
