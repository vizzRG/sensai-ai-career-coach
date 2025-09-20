"use client";
import { HeroGeometric } from "@/components/ui/shadcn-io/shape-landing-hero";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
motion;

import React from "react";

const Hero = () => {
  return (
    <div>
      <div>
        <HeroGeometric
          badge="sensai.io"
          title1="Your AI Career Coach for"
          title2="Professional Success"
          description="Advance your career with personalized guidance, interview prep, and AI-powered tools for job success."
        />
      </div>
      {/* <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src={"/LandingPage_Image.jpeg"}
          width={1980}
          height={720}
          alt="Banner Sensai"
          className="rounded-lg shadow-2xl border mx-auto "
          priority
        />
      </motion.div> */}
    </div>
  );
};

export default Hero;
