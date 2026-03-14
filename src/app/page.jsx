"use client";

import HeroSection from "@/components/module/landingPage/Hero";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { faqs } from "@/data/faqs";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

// Background Stars Component
function SectionStars({ count = 30 }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));

    setStars(generatedStars);
  }, [count]);

  if (!stars.length) return null;

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

// Floating Diamond Component
function FloatingDiamond({ className, delay = 0, size = 20, duration = 6 }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
    >
      <motion.div
        animate={{
          y: [-8, 8, -8],
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
      </motion.div>
    </motion.div>
  );
}

// Glow Line Component
function GlowLine({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute h-px ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
      viewport={{ once: true }}
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

// Animated Counter Component
function AnimatedCounter({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// Aurora Background Component
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[150%] h-[150%] left-[-25%] top-[-25%]"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(99,102,241,0.1)_60deg,transparent_120deg,rgba(168,85,247,0.1)_180deg,transparent_240deg,rgba(236,72,153,0.1)_300deg,transparent_360deg)]" />
      </motion.div>
    </div>
  );
}

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <div className="bg-[#030303]">
      <HeroSection />

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative w-full py-20 md:py-28 lg:py-36 bg-[#030303] overflow-hidden"
      >
        <SectionStars count={40} />
        <AuroraBackground />

        <FloatingDiamond
          className="left-[5%] top-[20%]"
          delay={0.2}
          size={25}
        />
        <FloatingDiamond
          className="right-[8%] top-[30%]"
          delay={0.4}
          size={30}
        />
        <FloatingDiamond
          className="left-[10%] bottom-[15%]"
          delay={0.6}
          size={20}
        />
        <FloatingDiamond
          className="right-[15%] bottom-[25%]"
          delay={0.3}
          size={35}
        />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm mb-6"
              whileHover={{ scale: 1.05 }}
            >
              ✨ Features
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
                Powerful Features for Your
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Career Growth
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="relative overflow-hidden bg-white/[0.03] border-white/10 hover:border-white/20 transition-all duration-500 group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardContent className="relative z-10 pt-8 pb-6 text-center flex flex-col items-center">
                    <motion.div
                      className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-indigo-400">{feature.icon}</div>
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <GlowLine className="bottom-0 left-[10%] w-[80%]" delay={0.5} />
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="relative w-full py-16 md:py-24 bg-[#050505] overflow-hidden"
      >
        <SectionStars count={25} />

        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/30 via-transparent to-purple-950/30" />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: "50", suffix: "+", label: "Industries Covered" },
              { value: "1000", suffix: "+", label: "Interview Questions" },
              { value: "95", suffix: "%", label: "Success Rate" },
              { value: "24", suffix: "/7", label: "AI Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex flex-col items-center justify-center space-y-3 p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-white/10 transition-colors"
              >
                <motion.div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.h3
                  className="relative text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </motion.h3>
                <p className="relative text-white/50 text-sm text-center">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative w-full py-20 md:py-28 lg:py-36 bg-[#030303] overflow-hidden"
      >
        <SectionStars count={35} />

        <FloatingDiamond
          className="left-[3%] top-[25%]"
          delay={0.3}
          size={22}
        />
        <FloatingDiamond
          className="right-[5%] bottom-[20%]"
          delay={0.5}
          size={28}
        />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div
            variants={itemVariants}
            className="text-center mx-auto max-w-3xl mb-16"
          >
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm mb-6"
              whileHover={{ scale: 1.05 }}
            >
              🚀 Process
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                How It Works
              </span>
            </h2>
            <p className="text-white/50 text-lg">
              Four simple steps to accelerate your career growth
            </p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-px">
              <div className="w-full h-full bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30" />
              <motion.div
                className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={{ x: ["-10%", "110%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1,
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative flex flex-col items-center text-center space-y-4 group"
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                      <div className="text-indigo-400">{item.icon}</div>
                    </div>
                    <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold border-2 border-[#030303]">
                      {index + 1}
                    </div>
                  </motion.div>
                  <h3 className="font-semibold text-xl text-white">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative w-full py-20 md:py-28 lg:py-36 bg-[#050505] overflow-hidden"
      >
        <SectionStars count={30} />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-purple-950/20" />

        <FloatingDiamond
          className="left-[8%] top-[15%]"
          delay={0.2}
          size={24}
        />
        <FloatingDiamond
          className="right-[10%] top-[20%]"
          delay={0.4}
          size={30}
        />
        <FloatingDiamond
          className="left-[5%] bottom-[20%]"
          delay={0.6}
          size={18}
        />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm mb-6"
              whileHover={{ scale: 1.05 }}
            >
              💬 Testimonials
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
                What Our Users Say
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="relative overflow-hidden bg-white/[0.03] border-white/10 hover:border-white/20 transition-all duration-500 group h-full">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <CardContent className="relative z-10 p-6">
                    <div className="flex flex-col space-y-5">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500/50 to-purple-500/50 blur-sm" />
                          <Image
                            src={item.image}
                            width={48}
                            height={48}
                            alt={item.author}
                            className="relative rounded-full object-cover border-2 border-white/20"
                          />
                        </motion.div>
                        <div>
                          <p className="font-semibold text-white">
                            {item.author}
                          </p>
                          <p className="text-sm text-white/50">{item.role}</p>
                          <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                            {item.company}
                          </p>
                        </div>
                      </div>
                      <blockquote className="relative pl-4 border-l-2 border-gradient-to-b from-indigo-500 to-purple-500">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500" />
                        <p className="text-white/60 italic text-sm leading-relaxed">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative w-full py-20 md:py-28 lg:py-36 bg-[#030303] overflow-hidden"
      >
        <SectionStars count={25} />

        <FloatingDiamond
          className="right-[5%] top-[30%]"
          delay={0.3}
          size={25}
        />
        <FloatingDiamond
          className="left-[8%] bottom-[25%]"
          delay={0.5}
          size={20}
        />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div
            variants={itemVariants}
            className="text-center mx-auto max-w-3xl mb-16"
          >
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm mb-6"
              whileHover={{ scale: 1.05 }}
            >
              ❓ FAQ
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-white/50 text-lg">
              Find answers to common questions about our platform
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-white/10 rounded-xl px-6 bg-white/[0.02] data-[state=open]:bg-white/[0.05] transition-colors overflow-hidden"
                >
                  <AccordionTrigger className="text-white hover:text-white/80 py-5 text-left [&[data-state=open]>svg]:rotate-180">
                    <span className="pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/50 pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full overflow-hidden"
      >
        <div className="relative mx-4 md:mx-8 lg:mx-16 my-8 py-20 md:py-28 rounded-3xl bg-[#0a0a0a] border border-white/10 overflow-hidden">
          <SectionStars count={50} />

          {/* Aurora effect */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute w-[200%] h-[200%] left-[-50%] top-[-50%]"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(99,102,241,0.15)_0deg,transparent_60deg,rgba(168,85,247,0.15)_120deg,transparent_180deg,rgba(236,72,153,0.15)_240deg,transparent_300deg,rgba(99,102,241,0.15)_360deg)]" />
            </motion.div>
          </div>

          {/* Floating diamonds */}
          <FloatingDiamond
            className="left-[10%] top-[20%]"
            delay={0.2}
            size={30}
          />
          <FloatingDiamond
            className="right-[12%] top-[25%]"
            delay={0.4}
            size={25}
          />
          <FloatingDiamond
            className="left-[15%] bottom-[20%]"
            delay={0.6}
            size={22}
          />
          <FloatingDiamond
            className="right-[8%] bottom-[30%]"
            delay={0.3}
            size={35}
          />

          {/* Glow effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
                Ready to Accelerate
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Your Career?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-white/50 text-lg md:text-xl max-w-xl"
            >
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link href="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="h-12 px-8 bg-white text-black hover:bg-white/90 font-medium relative overflow-hidden group"
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
                    <span className="relative flex items-center gap-2">
                      Start Your Journey Today
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </motion.section>

      {/* Spacer before footer */}
      <div className="h-8 bg-[#030303]" />
    </div>
  );
}
