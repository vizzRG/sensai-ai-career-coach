"use client";

import {
  Brain,
  BriefcaseIcon,
  LineChart,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Zap,
  Target,
  Clock,
} from "lucide-react";
import React, { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";

// Floating Diamond Component
function FloatingDiamond({ className, delay = 0, size = 15, duration = 6 }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.div
        animate={{
          y: [-5, 5, -5],
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
        <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-white/10 to-white/5 border border-white/20" />
      </motion.div>
    </motion.div>
  );
}

// Animated Stat Card
function StatCard({
  title,
  value,
  icon: Icon,
  iconColor,
  children,
  delay = 0,
  glowColor = "indigo",
}) {
  const glowColors = {
    indigo: "from-indigo-500/20 to-purple-500/20",
    green: "from-emerald-500/20 to-green-500/20",
    yellow: "from-yellow-500/20 to-amber-500/20",
    red: "from-red-500/20 to-rose-500/20",
    blue: "from-blue-500/20 to-cyan-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <Card className="relative overflow-hidden bg-white/[0.03] border-white/10 hover:border-white/20 transition-all duration-500 group h-full">
        {/* Glow effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${glowColors[glowColor]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Top border glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white/70">
            {title}
          </CardTitle>
          <motion.div
            whileHover={{ rotate: 15, scale: 1.2 }}
            className={`p-2 rounded-lg bg-white/5 border border-white/10`}
          >
            <Icon className={`h-4 w-4 ${iconColor}`} />
          </motion.div>
        </CardHeader>
        <CardContent className="relative">{children}</CardContent>
      </Card>
    </motion.div>
  );
}

// Custom Tooltip for Chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl"
      >
        <p className="font-semibold text-white mb-2">{label}</p>
        {payload.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <span className="text-white/60">{item.name}:</span>
            <span className="text-white font-medium">${item.value}k</span>
          </div>
        ))}
      </motion.div>
    );
  }
  return null;
};

const DashboardView = ({ insights }) => {
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-gradient-to-r from-emerald-500 to-green-500";
      case "medium":
        return "bg-gradient-to-r from-yellow-500 to-amber-500";
      case "low":
        return "bg-gradient-to-r from-red-500 to-rose-500";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500";
    }
  };

  const getDemandGlowColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "green";
      case "medium":
        return "yellow";
      case "low":
        return "red";
      default:
        return "indigo";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-emerald-400", glow: "green" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-400", glow: "yellow" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-400", glow: "red" };
      default:
        return { icon: LineChart, color: "text-gray-400", glow: "indigo" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;
  const outlookGlow = getMarketOutlookInfo(insights.marketOutlook).glow;

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true },
  );

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
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Badge */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap justify-between items-center gap-4"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <Clock className="w-4 h-4 text-indigo-400" />
          <span className="text-white/60 text-sm">Last Updated:</span>
          <span className="text-white/80 text-sm font-medium">
            {lastUpdatedDate}
          </span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
          </motion.div>
          <span className="text-white/60 text-sm">
            Next update {nextUpdateDistance}
          </span>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Market Outlook"
          icon={OutlookIcon}
          iconColor={outlookColor}
          delay={0.1}
          glowColor={outlookGlow}
        >
          <motion.div
            className="text-2xl font-bold text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          >
            {insights.marketOutlook}
          </motion.div>
          <p className="text-xs text-white/40 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Trending {insights.marketOutlook.toLowerCase()}
          </p>
        </StatCard>

        <StatCard
          title="Industry Growth"
          icon={TrendingUp}
          iconColor="text-emerald-400"
          delay={0.2}
          glowColor="green"
        >
          <motion.div
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
          >
            {insights.growthRate.toFixed(1)}%
          </motion.div>
          <div className="mt-3 relative">
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${insights.growthRate}%` }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              />
            </div>
            {/* Glow effect on progress */}
            <motion.div
              className="absolute top-0 h-2 bg-gradient-to-r from-emerald-500/50 to-green-500/50 rounded-full blur-sm"
              initial={{ width: 0 }}
              animate={{ width: `${insights.growthRate}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            />
          </div>
        </StatCard>

        <StatCard
          title="Demand Level"
          icon={BriefcaseIcon}
          iconColor="text-indigo-400"
          delay={0.3}
          glowColor={getDemandGlowColor(insights.demandLevel)}
        >
          <motion.div
            className="text-2xl font-bold text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
          >
            {insights.demandLevel}
          </motion.div>
          <motion.div
            className={`h-2 w-full rounded-full mt-3 ${getDemandLevelColor(insights.demandLevel)}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ transformOrigin: "left" }}
          />
        </StatCard>

        <StatCard
          title="Top Skills"
          icon={Brain}
          iconColor="text-purple-400"
          delay={0.4}
          glowColor="indigo"
        >
          <div className="flex flex-wrap gap-2 mt-1">
            {insights.topSkills.slice(0, 4).map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-white/10 text-white/80 hover:bg-white/10"
                >
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </StatCard>
      </div>

      {/* Salary Chart */}
      <motion.div variants={itemVariants}>
        <Card className="relative overflow-hidden bg-white/[0.02] border-white/10 hover:border-white/15 transition-all duration-500">
          {/* Corner decorations */}
          <FloatingDiamond className="right-4 top-4" delay={0.3} size={12} />
          <FloatingDiamond className="right-16 top-8" delay={0.5} size={8} />

          <CardHeader className="relative">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 15 }}
                className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10"
              >
                <Zap className="w-5 h-5 text-indigo-400" />
              </motion.div>
              <div>
                <CardTitle className="text-xl text-white">
                  Salary Ranges by Role
                </CardTitle>
                <CardDescription className="text-white/40">
                  Displaying minimum, median, and maximum salaries (in
                  thousands)
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryData} barGap={4}>
                  <defs>
                    <linearGradient
                      id="minGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#818cf8" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#6366f1"
                        stopOpacity={0.6}
                      />
                    </linearGradient>
                    <linearGradient
                      id="medianGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#8b5cf6"
                        stopOpacity={0.6}
                      />
                    </linearGradient>
                    <linearGradient
                      id="maxGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#f472b6" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#ec4899"
                        stopOpacity={0.6}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                    tickFormatter={(value) => `$${value}k`}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(255,255,255,0.02)" }}
                  />
                  <Bar
                    dataKey="min"
                    fill="url(#minGradient)"
                    name="Min Salary"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="median"
                    fill="url(#medianGradient)"
                    name="Median Salary"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="max"
                    fill="url(#maxGradient)"
                    name="Max Salary"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 pt-4 border-t border-white/5">
              {[
                { name: "Min Salary", color: "from-indigo-400 to-indigo-500" },
                {
                  name: "Median Salary",
                  color: "from-violet-400 to-purple-500",
                },
                { name: "Max Salary", color: "from-pink-400 to-rose-500" },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`}
                  />
                  <span className="text-white/50 text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Trends and Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Key Industry Trends */}
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden bg-white/[0.02] border-white/10 hover:border-white/15 transition-all duration-500 h-full group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-white/10"
                >
                  <Target className="w-5 h-5 text-emerald-400" />
                </motion.div>
                <div>
                  <CardTitle className="text-xl text-white">
                    Key Industry Trends
                  </CardTitle>
                  <CardDescription className="text-white/40">
                    Current trends shaping the industry
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative">
              <ul className="space-y-4">
                {insights.keyTrends.map((trend, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start space-x-3 group/item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <motion.div
                      className="relative mt-2"
                      whileHover={{ scale: 1.5 }}
                    >
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                      <div className="absolute inset-0 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-sm" />
                    </motion.div>
                    <span className="text-white/60 group-hover/item:text-white/80 transition-colors leading-relaxed">
                      {trend}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommended Skills */}
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden bg-white/[0.02] border-white/10 hover:border-white/15 transition-all duration-500 h-full group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10"
                >
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </motion.div>
                <div>
                  <CardTitle className="text-xl text-white">
                    Recommended Skills
                  </CardTitle>
                  <CardDescription className="text-white/40">
                    Skills to consider developing
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative">
              <div className="flex flex-wrap gap-3">
                {insights.recommendedSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <Badge
                      variant="outline"
                      className="px-4 py-2 bg-white/[0.03] border-white/10 text-white/70 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all cursor-default"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardView;
