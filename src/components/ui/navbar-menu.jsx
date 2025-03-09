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
  src
}) => {
  return (
    (<Link to={to} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl" />
      <div>
        <h4 className="text-xl font-bold mb-1 text-white">
          {title}
        </h4>
        <p className="text-sm max-w-[10rem] text-neutral-300">
          {description}
        </p>
      </div>
    </Link>)
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