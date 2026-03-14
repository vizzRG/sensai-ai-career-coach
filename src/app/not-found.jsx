"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Sparkles } from "lucide-react";

// Star Field Background
import { useState, useEffect } from "react";

function StarField() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
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
            opacity: [star.opacity, star.opacity * 2, star.opacity],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
}

// Floating Diamond
function FloatingDiamond({ className, delay = 0, size = 30, duration = 6 }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.div
        animate={{
          y: [-10, 10, -10],
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
        <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm border border-white/20" />
        <div className="absolute inset-[30%] rounded-sm bg-white/10" />
      </motion.div>
    </motion.div>
  );
}

// Aurora Background
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[200%] h-[200%] left-[-50%] top-[-50%]"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(99,102,241,0.15)_60deg,transparent_120deg,rgba(168,85,247,0.15)_180deg,transparent_240deg,rgba(236,72,153,0.15)_300deg,transparent_360deg)]" />
      </motion.div>
    </div>
  );
}

// Floating Astronaut/Lost Element
function FloatingElement() {
  return (
    <motion.div
      className="relative mb-8"
      animate={{
        y: [-20, 20, -20],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-3xl scale-150" />

        {/* Main 404 display */}
        <motion.div
          className="relative text-[120px] md:text-[180px] lg:text-[220px] font-bold leading-none select-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            4
          </span>
          <motion.span
            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400"
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            0
          </motion.span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-400 to-indigo-400">
            4
          </span>
        </motion.div>

        {/* Sparkle effects */}
        <motion.div
          className="absolute -top-4 -right-4"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-8 h-8 text-yellow-400/60" />
        </motion.div>
        <motion.div
          className="absolute -bottom-2 -left-6"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          <Sparkles className="w-6 h-6 text-indigo-400/60" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Glowing Ring
function GlowingRing() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, rgba(99, 102, 241, 0.1), transparent, rgba(168, 85, 247, 0.1), transparent)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center bg-[#030303] overflow-hidden">
      {/* Background Elements */}
      <StarField />
      <AuroraBackground />
      <GlowingRing />

      {/* Floating Diamonds */}
      <FloatingDiamond
        className="left-[10%] top-[20%]"
        delay={0.2}
        size={35}
        duration={7}
      />
      <FloatingDiamond
        className="right-[15%] top-[25%]"
        delay={0.4}
        size={25}
        duration={8}
      />
      <FloatingDiamond
        className="left-[8%] bottom-[30%]"
        delay={0.6}
        size={40}
        duration={6}
      />
      <FloatingDiamond
        className="right-[10%] bottom-[25%]"
        delay={0.3}
        size={30}
        duration={9}
      />
      <FloatingDiamond
        className="left-[25%] top-[15%]"
        delay={0.5}
        size={20}
        duration={7}
      />
      <FloatingDiamond
        className="right-[25%] bottom-[15%]"
        delay={0.7}
        size={28}
        duration={8}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Display */}
        <FloatingElement />

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-3xl font-semibold mb-4"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
            Lost in Space
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-white/50 mb-10 max-w-md text-base md:text-lg leading-relaxed"
        >
          Oops! The page you&apos;re looking for has drifted into the cosmic
          void or has been moved to another dimension.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="px-8 h-12 bg-white text-black hover:bg-white/90 font-medium relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Return Home
                </span>
              </Button>
            </motion.div>
          </Link>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="px-8 h-12 border-white/20 text-white hover:bg-white/10 hover:border-white/30 font-medium"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </motion.div>
        </motion.div>

        {/* Fun Fact */}
        <motion.div
          variants={itemVariants}
          className="mt-12 px-4 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <p className="text-white/40 text-sm flex items-center gap-2">
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              🛸
            </motion.span>
            <span>Error Code: 404 | Page Not Found</span>
            <motion.span
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              ✨
            </motion.span>
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />

      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#030303] to-transparent pointer-events-none" />
    </div>
  );
};

export default NotFound;
