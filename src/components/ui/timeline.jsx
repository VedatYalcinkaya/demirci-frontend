"use client";;
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({
  data
}) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="md:w-5/6 mx-auto bg-black/30 backdrop-blur-sm rounded-xl p-6 hover:bg-black/40 transition-colors font-sans md:px-10"
      ref={containerRef}
    >
      <div className="relative">
        {/* Neon Lamp Effect */}
        <div className="absolute left-1/2 -top-4 transform -translate-x-1/2 w-96 h-1 bg-emerald-500/50 blur-sm" />
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "24rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 -top-4 transform -translate-x-1/2 h-0.5 bg-emerald-400"
        />
        <div className="absolute left-1/2 top-[-0.9rem] transform -translate-x-1/2 w-96 h-32">
          <div
            className="w-full h-full"
            style={{
              background: `conic-gradient(from 270deg at 50% 0%, rgb(16 185 129 / 0.2), transparent 120deg)`,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto pt-10 px-4 md:px-8 lg:px-10 relative">
          {/* Başlık bölümünü kaldırıyoruz */}
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-emerald-500/20"
              >
                <div className="h-4 w-4 rounded-full bg-emerald-500/80 shadow-lg shadow-emerald-500/50" />
              </motion.div>
              <motion.h3 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-emerald-500/80"
              >
                {item.title}
              </motion.h3>
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative pl-20 pr-4 md:pl-4 w-full"
            >
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-emerald-500/80">
                {item.title}
              </h3>
              {item.content}
            </motion.div>
          </div>
        ))}
        <motion.div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent" />
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-emerald-500 via-emerald-400 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
};
