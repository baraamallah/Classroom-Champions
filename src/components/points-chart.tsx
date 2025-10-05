"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { Classroom } from "@/lib/types";
import { TrendingUp } from "lucide-react";

type PointsChartProps = {
  classroom: Classroom;
};

export default function PointsChart({ classroom }: PointsChartProps) {
  const today = new Date();
  const weekData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - (6-i));
    const dateString = date.toISOString().split("T")[0];
    return {
      date: date.toLocaleDateString("en-US", { weekday: "short" }),
      points: classroom.pointHistory[dateString] || 0,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary"/>
            Weekly Progress
        </CardTitle>
        <CardDescription>
          Points earned over the last 7 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            points: {
              label: "Points",
              color: "hsl(var(--primary))",
            },
          }}
          className="min-h-[200px] w-full"
        >
          <BarChart data={weekData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="points" fill="var(--color-points)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
