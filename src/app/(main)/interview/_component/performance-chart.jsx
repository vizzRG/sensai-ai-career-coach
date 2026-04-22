"use client";

import { memo, useMemo } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PerformanceChart = ({ assessments }) => {
  const chartData = useMemo(
    () =>
      (assessments || []).map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MM dd"),
        score: assessment.quizScore,
      })),
    [assessments]
  );

  return (
    <Card className="border border-white/10 bg-white/[0.02] backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
            Performance
          </span>{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
            Trend
          </span>
        </CardTitle>

        <CardDescription className="text-white/40">
          Track how your interview scores improve over time
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="date"
                stroke="#9ca3af"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />

              <YAxis
                domain={[0, 100]}
                stroke="#9ca3af"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-3 shadow-xl backdrop-blur-md">
                        <p className="text-sm font-medium text-white">
                          Score: {payload[0].value}%
                        </p>
                        <p className="text-xs text-white/40">
                          {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Line
                type="monotone"
                dataKey="score"
                stroke="url(#scoreGradient)"
                strokeWidth={3}
                dot={{ r: 4, fill: "#6366f1" }}
                activeDot={{ r: 6 }}
              />

              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(PerformanceChart);
