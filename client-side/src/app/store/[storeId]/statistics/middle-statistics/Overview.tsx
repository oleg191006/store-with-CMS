import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { IMonthlySales } from "@/shared/types/statistics.interface";
import styles from "./MiddleStatistics.module.scss";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { formatPrice } from "@/utils/string/format-price";

const chartConfig = {
  total: {
    label: "Profit",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

interface OverviewProps {
  data: IMonthlySales[];
}

export function Overview({ data }: OverviewProps) {
  return (
    <Card>
      <CardHeader className={styles.header}>
        <CardTitle>Profit Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="aspect-auto h-[310px] w-full"
          config={chartConfig}
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
          >
            <defs>
              <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-total)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-total)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => formatPrice(value)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `Date: ${value}`}
                  formatter={(value) => formatPrice(Number(value))}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="total"
              type="monotone"
              fill="url(#fillTotal)"
              fillOpacity={0.4}
              stroke="var(--color-total)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
