"use client";
import { motion } from "framer-motion";
import Link from "next/link";
const Footer = () => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32  text-sm text-muted-foreground"
    >
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-between gap-8 items-start pb-6 border-borderColor border-b"
      >
        <div>
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            src={"/logo.png"}
            alt="logo"
            className="h-8 md:h-9"
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3 mt-6"
          >
            <a href="#">
              <img src={"/facebook_logo.svg"} className="w-5 h-5" alt="" />
            </a>
            <a href="#">
              <img src={"/instagram_logo.svg"} className="w-5 h-5" alt="" />
            </a>
            <a href="#">
              <img src={"/gmail_logo.svg"} className="w-5 h-5" alt="" />
            </a>
            <a href="#">
              <img src={"/twitter_logo.svg"} className="w-5 h-5" alt="" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-between w-1/2 gap-8"
        >
          <div>
            <h2 className="text-base font-medium  text-[#487ccf] uppercase">
              Quick Links
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/dashboard">Job Insights</Link>
              </li>
              <li>
                <Link href="/resume">Resume Builder</Link>
              </li>
              <li>
                <Link href="/interview">Interview Prep</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-medium  text-[#487ccf] uppercase">
              Resources
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">AI Usage Policy</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-medium  text-[#487ccf]  uppercase">
              Contact
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>SENSAI HQ</li>
              <li>Delhi,India</li>
              <li>+91 9239239239</li>
              <li>support@sensai.ai</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 10 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5"
      >
        <p>
          © 2025 SENSAI. All rights reserved. Empowering your career with AI.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>|</li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>|</li>
          <li>
            <a href="#">Sitemap</a>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
