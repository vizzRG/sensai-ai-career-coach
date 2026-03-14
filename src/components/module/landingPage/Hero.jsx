"use client";
import { HeroGeometric } from "@/components/ui/shadcn-io/shape-landing-hero";
import { motion } from "framer-motion";

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
    </div>
  );
};

export default Hero;
