"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({
  children,
  className
}) => {
  const containerRef = useRef(null);
  const parentRef = useRef(null);

  const beams = [
    {
      initialX: "5vw",
      translateX: "5vw",
      duration: 7,
      repeatDelay: 3,
      delay: 2,
    },
    {
      initialX: "15vw",
      translateX: "15vw",
      duration: 3,
      repeatDelay: 3,
      delay: 4,
    },
    {
      initialX: "25vw",
      translateX: "25vw",
      duration: 7,
      repeatDelay: 7,
      className: "h-6",
    },
    {
      initialX: "35vw",
      translateX: "35vw",
      duration: 5,
      repeatDelay: 14,
      delay: 4,
    },
    {
      initialX: "45vw",
      translateX: "45vw",
      duration: 11,
      repeatDelay: 2,
      className: "h-20",
    },
    {
      initialX: "55vw",
      translateX: "55vw",
      duration: 4,
      repeatDelay: 2,
      className: "h-12",
    },
    {
      initialX: "65vw",
      translateX: "65vw",
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      className: "h-6",
    },
    {
      initialX: "75vw",
      translateX: "75vw",
      duration: 8,
      repeatDelay: 5,
      delay: 1,
      className: "h-16",
    },
    {
      initialX: "85vw",
      translateX: "85vw",
      duration: 9,
      repeatDelay: 6,
      delay: 3,
      className: "h-8",
    },
    {
      initialX: "95vw",
      translateX: "95vw",
      duration: 5,
      repeatDelay: 4,
      className: "h-10",
    },
    {
      initialX: "20vw",
      translateX: "20vw",
      duration: 7,
      repeatDelay: 3,
      delay: 2,
      className: "h-14",
    },
    {
      initialX: "40vw",
      translateX: "40vw",
      duration: 6,
      repeatDelay: 5,
      delay: 1,
      className: "h-18",
    },
    {
      initialX: "60vw",
      translateX: "60vw",
      duration: 5,
      repeatDelay: 4,
      delay: 3,
      className: "h-10",
    },
    {
      initialX: "80vw",
      translateX: "80vw",
      duration: 8,
      repeatDelay: 3,
      delay: 2,
      className: "h-16",
    },
    {
      initialX: "90vw",
      translateX: "90vw",
      duration: 6,
      repeatDelay: 5,
      delay: 1,
      className: "h-12",
    }
  ];

  return (
    (<div
      ref={parentRef}
      className={cn(
        "h-screen relative flex items-center w-full justify-center overflow-hidden",
        className
      )}>
      {beams.map((beam) => (
        <CollisionMechanism
          key={beam.initialX + "beam-idx"}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef} />
      ))}
      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 w-full inset-x-0 pointer-events-none">
      </div>
    </div>)
  );
};

const CollisionMechanism = React.forwardRef(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef(null);
  const [collision, setCollision] = useState({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  return (<>
    <motion.div
      key={beamKey}
      ref={beamRef}
      animate="animate"
      initial={{
        translateY: beamOptions.initialY || "-200px",
        translateX: beamOptions.initialX || "0px",
        rotate: beamOptions.rotate || 0,
      }}
      variants={{
        animate: {
          translateY: beamOptions.translateY || "1800px",
          translateX: beamOptions.translateX || "0px",
          rotate: beamOptions.rotate || 0,
        },
      }}
      transition={{
        duration: beamOptions.duration || 8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        delay: beamOptions.delay || 0,
        repeatDelay: beamOptions.repeatDelay || 0,
      }}
      className={cn(
        "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-green-500 via-emerald-500 to-transparent",
        beamOptions.className
      )} />
    <AnimatePresence>
      {collision.detected && collision.coordinates && (
        <Explosion
          key={`${collision.coordinates.x}-${collision.coordinates.y}`}
          className=""
          style={{
            left: `${collision.coordinates.x}px`,
            top: `${collision.coordinates.y}px`,
            transform: "translate(-50%, -50%)",
          }} />
      )}
    </AnimatePresence>
  </>);
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({
  ...props
}) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    (<div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-green-500 to-transparent blur-sm"></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-green-500 to-emerald-500" />
      ))}
    </div>)
  );
};
