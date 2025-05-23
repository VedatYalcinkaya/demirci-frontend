"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName
}) => {
  const [transform, setTransform] = useState("translate(-50%,-50%) rotateX(0deg)");
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // İlk yükleme kontrolü
    checkScreenSize();
    
    // Ekran boyutu değişimini izle
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const onMouseEnter = () => {
    if (!isMobile) {
      setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
    }
  };
  
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  // Mobil cihazlar için basitleştirilmiş görünüm
  if (isMobile) {
    return (
      <div className={cn("relative rounded-2xl overflow-hidden", containerClassName)}>
        <div className="p-1 rounded-2xl bg-gradient-to-b from-emerald-500 to-cyan-500">
          <div className="bg-black rounded-xl p-1">
            <div className={cn("relative rounded-lg overflow-hidden", className)}>
              {children}
            </div>
            {title && (
              <div className="absolute top-2 left-0 right-0 flex justify-center">
                <div className="bg-black/80 rounded-full px-3 py-1 text-xs text-white font-bold ring-1 ring-white/10">
                  {title}
                </div>
              </div>
            )}
          </div>
        </div>
        {href && (
          <Link
            to={href}
            className="absolute inset-0 z-40"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={title || "View details"}
          />
        )}
      </div>
    );
  }

  // Desktop görünümü (3D efektli)
  return (
    <div
      className={cn("relative group/pin z-50 cursor-pointer", containerClassName)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2">
        <div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-black border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden">
          <div className={cn(" relative z-50 ", className)}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} />
      {href && (
        <Link
          to={href}
          className="absolute inset-0 z-40"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={title || "View details"}
        />
      )}
    </div>
  );
};

export const PinPerspective = ({
  title
}) => {
  return (
    <div
      className="pointer-events-none w-full md:w-96 h-60 md:h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500">
      <div className="w-full h-full -mt-7 flex-none inset-0">
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <div
            className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
            <span
              className="relative z-20 text-white text-xs font-bold inline-block py-0.5">
              {title}
            </span>

            <span
              className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
          </div>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-36 md:h-[11.25rem] md:w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)] animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "0s" }}
          ></div>
          
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-36 md:h-[11.25rem] md:w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)] animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "2s" }}
          ></div>
          
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-36 md:h-[11.25rem] md:w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)] animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "4s" }}
          ></div>
        </div>

        <div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-16 md:h-20 group-hover/pin:h-24 md:group-hover/pin:h-40 blur-[2px]" />
        <div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-16 md:h-20 group-hover/pin:h-24 md:group-hover/pin:h-40" />
        <div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-cyan-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
        <div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-cyan-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40" />
      </div>
    </div>
  );
};
