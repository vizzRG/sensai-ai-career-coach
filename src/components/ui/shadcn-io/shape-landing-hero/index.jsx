// "use client";
// import { motion } from "framer-motion";
// import { Circle } from "lucide-react";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// function ElegantShape({
//   className,
//   delay = 0,
//   width = 400,
//   height = 100,
//   rotate = 0,
//   gradient = "from-white/[0.08]",
// }) {
//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: -150,
//         rotate: rotate - 15,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//         rotate: rotate,
//       }}
//       transition={{
//         duration: 2.4,
//         delay,
//         ease: [0.23, 0.86, 0.39, 0.96],
//         opacity: { duration: 1.2 },
//       }}
//       className={cn("absolute", className)}
//     >
//       <motion.div
//         animate={{
//           y: [0, 15, 0],
//         }}
//         transition={{
//           duration: 12,
//           repeat: Number.POSITIVE_INFINITY,
//           ease: "easeInOut",
//         }}
//         style={{
//           width,
//           height,
//         }}
//         className="relative"
//       >
//         <div
//           className={cn(
//             "absolute inset-0 rounded-full",
//             "bg-gradient-to-r to-transparent",
//             gradient,
//             "backdrop-blur-[2px] border-2 border-white/[0.15]",
//             "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
//             "after:absolute after:inset-0 after:rounded-full",
//             "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
//           )}
//         />
//       </motion.div>
//     </motion.div>
//   );
// }

// export function HeroGeometric({
//   badge = "shadcn.io",
//   title1 = "Elevate Your Digital Vision",
//   title2 = "Crafting Exceptional Websites",
//   description = "Crafting exceptional digital experiences through innovative design and cutting-edge technology.",
//   className,
// }) {
//   const fadeUpVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 1,
//         delay: 0.5 + i * 0.2,
//         ease: [0.25, 0.4, 0.25, 1],
//       },
//     }),
//   };

//   return (
//     <div
//       className={cn(
//         "relative min-h-screen w-full flex pt-36 md:pt-48 pb-10 justify-center overflow-hidden bg-[#030303]",
//         className,
//       )}
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
//       <div className="absolute inset-0 overflow-hidden">
//         <ElegantShape
//           delay={0.3}
//           width={600}
//           height={140}
//           rotate={12}
//           gradient="from-indigo-500/[0.15]"
//           className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
//         />

//         <ElegantShape
//           delay={0.5}
//           width={500}
//           height={120}
//           rotate={-15}
//           gradient="from-rose-500/[0.15]"
//           className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
//         />

//         <ElegantShape
//           delay={0.4}
//           width={300}
//           height={80}
//           rotate={-8}
//           gradient="from-violet-500/[0.15]"
//           className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
//         />

//         <ElegantShape
//           delay={0.6}
//           width={200}
//           height={60}
//           rotate={20}
//           gradient="from-amber-500/[0.15]"
//           className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
//         />

//         <ElegantShape
//           delay={0.7}
//           width={150}
//           height={40}
//           rotate={-25}
//           gradient="from-cyan-500/[0.15]"
//           className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
//         />
//       </div>
//       <div className="relative z-10 container mx-auto px-4 md:px-6">
//         <div className="max-w-3xl mx-auto text-center">
//           <motion.div
//             custom={0}
//             variants={fadeUpVariants}
//             initial="hidden"
//             animate="visible"
//             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
//           >
//             <Circle className="h-2 w-2 fill-rose-500/80" />
//             <span className="text-sm text-white/60 tracking-wide">{badge}</span>
//           </motion.div>

//           <motion.div
//             custom={1}
//             variants={fadeUpVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold mb-6 md:mb-8 tracking-tight">
//               <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
//                 {title1}
//               </span>
//               <br />
//               <span
//                 className={cn(
//                   "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300",
//                 )}
//               >
//                 {title2}
//               </span>
//             </h1>
//           </motion.div>

//           <motion.div
//             custom={2}
//             variants={fadeUpVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <p className="text-base sm:text-md md:text-lg text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
//               {description}
//             </p>
//             <div className="space-x-4 ">
//               <Link href="/dashboard">
//                 <Button size="lg" className="px-8 cursor-pointer">
//                   Get Started
//                 </Button>
//               </Link>
//               <Link
//                 href="https://www.linkedin.com/in/vishal-tyagi-071b46270/"
//                 target="_blank"
//               >
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   className="px-8 cursor-pointer"
//                 >
//                   Watch Demo
//                 </Button>
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
//     </div>
//   );
// }

"use client";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function AuroraWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-[200%] h-[200%] left-[-50%] top-[-50%]"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#0f172a_0deg,#1e1b4b_60deg,#0f172a_120deg,#1e3a5f_180deg,#0f172a_240deg,#312e81_300deg,#0f172a_360deg)] opacity-40" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[60%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,300 C360,400 720,200 1080,300 C1260,350 1380,280 1440,300 L1440,600 L0,600 Z"
            fill="url(#wave-gradient-1)"
            initial={{
              d: "M0,300 C360,400 720,200 1080,300 C1260,350 1380,280 1440,300 L1440,600 L0,600 Z",
            }}
            animate={{
              d: [
                "M0,300 C360,400 720,200 1080,300 C1260,350 1380,280 1440,300 L1440,600 L0,600 Z",
                "M0,350 C360,250 720,350 1080,250 C1260,300 1380,350 1440,280 L1440,600 L0,600 Z",
                "M0,280 C360,350 720,280 1080,380 C1260,320 1380,300 1440,350 L1440,600 L0,600 Z",
                "M0,300 C360,400 720,200 1080,300 C1260,350 1380,280 1440,300 L1440,600 L0,600 Z",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M0,400 C360,300 720,450 1080,350 C1260,400 1380,380 1440,420 L1440,600 L0,600 Z"
            fill="url(#wave-gradient-2)"
            animate={{
              d: [
                "M0,400 C360,300 720,450 1080,350 C1260,400 1380,380 1440,420 L1440,600 L0,600 Z",
                "M0,350 C360,450 720,350 1080,450 C1260,380 1380,420 1440,380 L1440,600 L0,600 Z",
                "M0,420 C360,380 720,400 1080,320 C1260,420 1380,350 1440,400 L1440,600 L0,600 Z",
                "M0,400 C360,300 720,450 1080,350 C1260,400 1380,380 1440,420 L1440,600 L0,600 Z",
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient
              id="wave-gradient-1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.15)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.1)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.15)" />
            </linearGradient>
            <linearGradient
              id="wave-gradient-2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="50%" stopColor="rgba(147, 51, 234, 0.08)" />
              <stop offset="100%" stopColor="rgba(244, 63, 94, 0.1)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}

function FloatingDiamond({ className, delay = 0, size = 40, duration = 6 }) {
  return (
    <motion.div
      className={cn("absolute", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay }}
    >
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotateZ: [0, 5, -5, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          style={{ width: size, height: size }}
          className="relative rotate-45"
          animate={{ rotate: [45, 50, 40, 45] }}
          transition={{
            duration: duration * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20" />
          <div className="absolute inset-[30%] rounded-sm bg-white/10" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function StarField() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 3 + 2,
    }));

    setStars(generatedStars);
  }, []);

  return (
    <div className="absolute inset-0">
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

function GlowLine({ className, delay = 0 }) {
  return (
    <motion.div
      className={cn("absolute h-px", className)}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
    >
      <div className="w-full h-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <motion.div
        className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white to-transparent"
        animate={{ x: ["-100%", "500%"] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 1,
          repeatDelay: 2,
        }}
      />
    </motion.div>
  );
}

export function HeroGeometric({
  badge = "shadcn.io",
  title1 = "Elevate Your Digital Vision",
  title2 = "Crafting Exceptional Websites",
  description = "Crafting exceptional digital experiences through innovative design and cutting-edge technology.",
  className,
}) {
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.03,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.5,
      },
    },
  };

  const slideUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1 + i * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div
      className={cn(
        "relative min-h-screen w-full flex pt-36 md:pt-48 pb-10 justify-center overflow-hidden bg-[#030303]",
        className,
      )}
    >
      {/* Star field background */}
      <StarField />

      {/* Aurora waves */}
      <AuroraWaves />

      {/* Floating diamonds */}
      <FloatingDiamond
        delay={0.2}
        size={30}
        className="left-[10%] top-[20%]"
        duration={7}
      />
      <FloatingDiamond
        delay={0.4}
        size={50}
        className="right-[15%] top-[25%]"
        duration={8}
      />
      <FloatingDiamond
        delay={0.6}
        size={25}
        className="left-[20%] bottom-[30%]"
        duration={6}
      />
      <FloatingDiamond
        delay={0.8}
        size={40}
        className="right-[10%] bottom-[40%]"
        duration={9}
      />
      <FloatingDiamond
        delay={1}
        size={35}
        className="left-[5%] top-[50%]"
        duration={7}
      />
      <FloatingDiamond
        delay={0.5}
        size={20}
        className="right-[25%] top-[15%]"
        duration={5}
      />

      {/* Glow lines */}
      <GlowLine className="top-[30%] left-[5%] w-[30%]" delay={0.8} />
      <GlowLine className="top-[70%] right-[5%] w-[25%]" delay={1.2} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 mb-8 md:mb-12 backdrop-blur-md"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Circle className="h-2 w-2 fill-emerald-400 text-emerald-400" />
            </motion.div>
            <span className="text-sm text-white/70 tracking-wide">{badge}</span>
          </motion.div>

          {/* Title 1 - Letter by letter animation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="overflow-hidden mb-2"
          >
            <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="inline-flex flex-wrap justify-center">
                {title1.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    className="inline-block bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>
          </motion.div>

          {/* Title 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="mb-6 md:mb-8"
          >
            <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  {title2}
                </span>
                <motion.span
                  className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-2xl -z-10"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            custom={0}
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-md md:text-lg text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              {description}
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            custom={1}
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/dashboard">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="px-8 cursor-pointer relative overflow-hidden bg-white text-black hover:bg-white/90 font-medium"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                  <span className="relative">Get Started</span>
                </Button>
              </motion.div>
            </Link>
            <Link
              href="https://www.linkedin.com/in/vishal-tyagi-071b46270/"
              target="_blank"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 cursor-pointer border-white/20 text-white hover:bg-white/10 hover:border-white/30 font-medium"
                >
                  Watch Demo
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Top and bottom gradients */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#030303] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />
    </div>
  );
}
