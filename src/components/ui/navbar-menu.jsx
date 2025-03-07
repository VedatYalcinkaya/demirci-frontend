"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
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
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        className="cursor-pointer text-white hover:text-white/60 transition-colors"
        animate={{
          color: active === item ? "white" : "#ffffffaa",
        }}
      >
        {item}
      </motion.p>
      {active === item && (
        <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={transition}
            layoutId="dropdown"
            className="bg-black/90 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-xl z-50"
          >
            <motion.div
              layout
              className="p-4 min-w-[200px] max-h-[80vh] overflow-auto"
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export function Menu({ children, setActive }) {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-md px-8 py-4"
    >
      {children}
    </nav>
  );
}

export const ProductItem = ({
  title,
  description,
  to,
  src,
}) => {
  return (
    <Link to={to} className="flex flex-col gap-2 group p-2">
      <div className="relative overflow-hidden rounded-xl h-28">
        <img
          src={src}
          alt={title}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
      </div>
      <div>
        <h3 className="font-medium text-white text-sm">{title}</h3>
        <p className="text-xs text-neutral-300 line-clamp-2">{description}</p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ to, children, ...rest }) => {
  return (
    <Link
      to={to}
      {...rest}
      className="text-neutral-200 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
};
