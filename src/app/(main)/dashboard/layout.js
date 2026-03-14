"use client";

import React, { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Sparkles } from "lucide-react";

// Star Field Background
function PageStars() {
  const [stars] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 3 + 2,
    })),
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            opacity: [star.opacity, star.opacity * 2, star.opacity],
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

// Floating Diamond
function FloatingDiamond({ className, delay = 0, size = 20, duration = 6 }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotate: [45, 50, 40, 45],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width: size, height: size }}
        className="rotate-45"
      >
        <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20" />
      </motion.div>
    </motion.div>
  );
}

// Glow Line
function GlowLine({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute h-px ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
    >
      <div className="w-full h-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <motion.div
        className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white to-transparent"
        animate={{ x: ["-100%", "600%"] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 1,
          repeatDelay: 3,
        }}
      />
    </motion.div>
  );
}

// Custom Loading Component
function CustomLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative mt-8"
    >
      {/* Loading bar container */}
      <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
        {/* Animated gradient bar */}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
          animate={{
            x: ["-100%", "400%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Glow effect */}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 rounded-full blur-sm"
          animate={{
            x: ["-100%", "400%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Loading text */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-6"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
        </motion.div>
        <span className="text-white/40 text-sm">Loading insights...</span>
      </motion.div>
    </motion.div>
  );
}

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#030303] overflow-hidden">
      {/* Background Elements */}
      <PageStars />

      {/* Aurora gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-purple-950/20 pointer-events-none" />

      {/* Floating Diamonds */}
      <FloatingDiamond
        className="right-[5%] top-[15%]"
        delay={0.2}
        size={25}
        duration={7}
      />
      <FloatingDiamond
        className="right-[15%] top-[25%]"
        delay={0.4}
        size={18}
        duration={8}
      />
      <FloatingDiamond
        className="left-[3%] top-[40%]"
        delay={0.6}
        size={22}
        duration={6}
      />

      {/* Content Container */}
      <div className="relative z-10 px-5 md:px-8 lg:px-12 py-8 pt-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur-xl" />
              <div className="relative p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10">
                <BarChart3 className="w-8 h-8 text-indigo-400" />
              </div>
            </motion.div>

            {/* Title */}
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
                  Industry
                </span>{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  Insights
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-white/40 mt-2 text-sm md:text-base"
              >
                Real-time market trends and analysis powered by AI
              </motion.p>
            </div>
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </motion.div>
            <span className="text-white/60 text-sm">Live Data</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </motion.div>
        </motion.div>

        {/* Separator Line */}
        <GlowLine className="left-0 right-0 mb-8" delay={0.6} />

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Suspense fallback={<CustomLoader />}>{children}</Suspense>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none z-20" />
    </div>
  );
};

export default Layout;
