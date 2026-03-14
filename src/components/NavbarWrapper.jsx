// components/NavbarWrapper.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

function NavStars() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 3 + 2,
    }));

    setStars(generatedStars);
  }, []);

  if (!stars.length) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

function GlowingBorder() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-px">
      <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <motion.div
        className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent"
        animate={{ x: ["-10%", "110%"] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 2,
        }}
      />
    </div>
  );
}

function FloatingDiamond({ delay = 0, size = 10, className = "" }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.div
        animate={{
          y: [-3, 3, -3],
          rotate: [45, 50, 40, 45],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width: size, height: size }}
        className="rotate-45"
      >
        <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-white/15 to-white/5 border border-white/20" />
      </motion.div>
    </motion.div>
  );
}

export function NavbarWrapper({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.6, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className="fixed top-0 w-full z-50"
    >
      <motion.div
        className="absolute inset-0 bg-[#030303]/80 backdrop-blur-xl"
        style={{ opacity: backgroundOpacity }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/30 via-transparent to-purple-950/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      {/* Stars */}
      <NavStars />

      {/* Floating diamonds */}
      <FloatingDiamond delay={0.3} size={8} className="left-[15%] top-[30%]" />
      <FloatingDiamond delay={0.5} size={6} className="right-[25%] top-[40%]" />
      <FloatingDiamond delay={0.7} size={10} className="left-[40%] top-[20%]" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-16 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-16 bg-gradient-to-bl from-purple-500/10 to-transparent pointer-events-none" />

      {/* Content */}
      {children}

      {/* Animated bottom border */}
      <GlowingBorder />

      {/* Scroll indicator shadow */}
      <motion.div
        className="absolute -bottom-4 left-0 right-0 h-4 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.header>
  );
}
