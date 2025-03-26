"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  className
}) => {
  return (
    (<div onMouseEnter={() => setActive(item)} className={`relative ${className || ''}`}>
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer hover:opacity-[0.9] text-white">
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}>
          {active === item && (
            <div
              className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                // layoutId ensures smooth animation
                layoutId="active"
                className="bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-white/[0.2] shadow-xl">
                <motion.div
                  // layout ensures smooth animation
                  layout
                  className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>)
  );
};

export const Menu = ({
  setActive,
  children
}) => {
  return (
    (<nav
      // resets the state
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border bg-black border-white/[0.2]  shadow-input flex justify-center space-x-4 px-8 py-6 ">
      {children}
    </nav>)
  );
};

export const ProductItem = ({
  title,
  description,
  to,
  src,
  hoverColor = "emerald"
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Tema rengi için çevirme tablosu
  const colorMap = {
    emerald: "bg-emerald-500/10 border-emerald-500/20",
    sky: "bg-sky-500/10 border-sky-500/20",
    purple: "bg-purple-500/10 border-purple-500/20",
    orange: "bg-orange-500/10 border-orange-500/20",
    red: "bg-red-500/10 border-red-500/20",
    indigo: "bg-indigo-500/10 border-indigo-500/20"
  };
  
  const hoverClass = colorMap[hoverColor] || colorMap.emerald;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center p-3 rounded-lg transition-all duration-300 ${isHovered ? hoverClass : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={src}
        width={40}
        height={40}
        alt={title}
        className="flex-shrink-0 rounded-md object-contain mr-3" />
      <div>
        <h4 className="text-sm font-bold mb-1 text-white flex items-center">
          {title}
        </h4>
        <p className="text-xs text-neutral-400 line-clamp-2 max-w-[15rem]">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, to, ...rest }) => {
  return (
    <Link
      to={to}
      {...rest}
      className="text-neutral-200 hover:text-white transition-all duration-300 hover:font-medium"
    >
      {children}
    </Link>
  );
};