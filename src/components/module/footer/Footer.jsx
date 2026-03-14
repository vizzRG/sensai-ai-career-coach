"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

function FooterStarField() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
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
            scale: [1, 1.2, 1],
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

function FooterGlowLine({ className, delay = 0 }) {
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
        className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-transparent via-white to-transparent"
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

function FloatingDiamondSmall({ className, delay = 0, size = 20 }) {
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
          y: [-5, 5, -5],
          rotate: [45, 50, 40, 45],
        }}
        transition={{
          duration: 6,
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

const Footer = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const linkHoverVariants = {
    hover: {
      x: 5,
      color: "rgba(255, 255, 255, 0.9)",
      transition: { duration: 0.2 },
    },
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="relative px-6 md:px-16 lg:px-24 xl:px-32 text-sm text-white/50 bg-[#030303] overflow-hidden"
    >
      {/* Background Elements */}
      <FooterStarField />

      {/* Aurora gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-950/10 via-transparent to-pink-950/10 pointer-events-none" />

      {/* Floating diamonds */}
      <FloatingDiamondSmall
        className="left-[5%] top-[20%]"
        delay={0.3}
        size={15}
      />
      <FloatingDiamondSmall
        className="right-[8%] top-[30%]"
        delay={0.5}
        size={20}
      />
      <FloatingDiamondSmall
        className="left-[15%] bottom-[25%]"
        delay={0.7}
        size={12}
      />
      <FloatingDiamondSmall
        className="right-[20%] bottom-[40%]"
        delay={0.4}
        size={18}
      />

      {/* Top glow line */}
      <FooterGlowLine className="top-0 left-[10%] w-[80%]" delay={0.2} />

      {/* Main content */}
      <motion.div
        variants={itemVariants}
        className="relative z-10 flex flex-wrap justify-between gap-8 items-start pt-12 pb-8 border-b border-white/10"
      >
        {/* Logo and Social */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img src={"/newLogo.png"} alt="logo" className="h-14 md:h-15" />
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl -z-10 rounded-lg"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mt-6"
          >
            {[
              { src: "/facebook_logo.svg", alt: "Facebook" },
              { src: "/instagram_logo.svg", alt: "Instagram" },
              { src: "/gmail_logo.svg", alt: "Gmail" },
              { src: "/twitter_logo.svg", alt: "Twitter" },
            ].map((social, index) => (
              <motion.a
                key={social.alt}
                href="#"
                variants={socialIconVariants}
                whileHover="hover"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-colors"
              >
                <img src={social.src} className="w-4 h-4" alt={social.alt} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Links Section */}
        <motion.div
          variants={containerVariants}
          className="flex flex-wrap justify-between w-full md:w-1/2 gap-8"
        >
          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h2 className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 uppercase tracking-wider">
              Quick Links
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/dashboard", label: "Job Insights" },
                { href: "/resume", label: "Resume Builder" },
                { href: "/interview", label: "Interview Prep" },
              ].map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={link.href}>
                    <motion.span
                      className="inline-block hover:text-white transition-colors relative group"
                      variants={linkHoverVariants}
                      whileHover="hover"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h2 className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 uppercase tracking-wider">
              Resources
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {[
                "Help Center",
                "Terms of Service",
                "Privacy Policy",
                "AI Usage Policy",
              ].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a href="#">
                    <motion.span
                      className="inline-block hover:text-white transition-colors relative group"
                      variants={linkHoverVariants}
                      whileHover="hover"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
                    </motion.span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h2 className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-400 uppercase tracking-wider">
              Contact
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {[
                { text: "SENSAI HQ", icon: "🏢" },
                { text: "Delhi, India", icon: "📍" },
                { text: "+91 9239239239", icon: "📞" },
                { text: "support@sensai.ai", icon: "✉️" },
              ].map((item, index) => (
                <motion.li
                  key={item.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 hover:text-white/70 transition-colors"
                >
                  <span className="text-xs">{item.icon}</span>
                  {item.text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col md:flex-row gap-3 items-center justify-between py-6"
      >
        <motion.p
          className="text-white/40 text-center md:text-left"
          whileHover={{ color: "rgba(255, 255, 255, 0.6)" }}
        >
          © 2025{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 font-medium">
            SENSAI
          </span>
          . All rights reserved. Empowering your career with AI.
        </motion.p>

        <ul className="flex items-center gap-4">
          {["Privacy", "Terms", "Sitemap"].map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              viewport={{ once: true }}
            >
              {index > 0 && <span className="mr-4 text-white/20">|</span>}
              <a href="#">
                <motion.span
                  className="hover:text-white transition-colors relative"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.span>
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </motion.footer>
  );
};

export default Footer;
