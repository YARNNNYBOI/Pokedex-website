"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", xp: 222, caught: 5 },
  { date: "2024-04-02", xp: 97, caught: 2 },
  { date: "2024-04-03", xp: 167, caught: 4 },
  { date: "2024-04-04", xp: 242, caught: 6 },
  { date: "2024-04-05", xp: 373, caught: 9 },
  { date: "2024-04-06", xp: 301, caught: 8 },
  { date: "2024-04-07", xp: 245, caught: 5 },
  { date: "2024-04-08", xp: 409, caught: 10 },
  { date: "2024-04-09", xp: 59, caught: 1 },
  { date: "2024-04-10", xp: 261, caught: 6 },
  { date: "2024-04-11", xp: 327, caught: 8 },
  { date: "2024-04-12", xp: 292, caught: 5 },
  { date: "2024-04-13", xp: 342, caught: 9 },
  { date: "2024-04-14", xp: 137, caught: 3 },
  { date: "2024-04-15", xp: 120, caught: 4 },
  { date: "2024-04-16", xp: 138, caught: 4 },
  { date: "2024-04-17", xp: 446, caught: 11 },
  { date: "2024-04-18", xp: 364, caught: 10 },
  { date: "2024-04-19", xp: 243, caught: 5 },
  { date: "2024-04-20", xp: 89, caught: 2 },
  { date: "2024-04-21", xp: 137, caught: 4 },
  { date: "2024-04-22", xp: 224, caught: 5 },
  { date: "2024-04-23", xp: 138, caught: 6 },
  { date: "2024-04-24", xp: 387, caught: 8 },
  { date: "2024-04-25", xp: 215, caught: 7 },
  { date: "2024-04-26", xp: 75, caught: 3 },
  { date: "2024-04-27", xp: 383, caught: 11 },
  { date: "2024-04-28", xp: 122, caught: 5 },
  { date: "2024-04-29", xp: 315, caught: 7 },
  { date: "2024-04-30", xp: 454, caught: 10 },
  { date: "2024-05-01", xp: 165, caught: 6 },
  { date: "2024-05-02", xp: 293, caught: 8 },
  { date: "2024-05-03", xp: 247, caught: 5 },
  { date: "2024-05-04", xp: 385, caught: 11 },
  { date: "2024-05-05", xp: 481, caught: 10 },
  { date: "2024-05-06", xp: 498, caught: 13 },
  { date: "2024-05-07", xp: 388, caught: 8 },
  { date: "2024-05-08", xp: 149, caught: 5 },
  { date: "2024-05-09", xp: 227, caught: 5 },
  { date: "2024-05-10", xp: 293, caught: 9 },
  { date: "2024-05-11", xp: 335, caught: 7 },
  { date: "2024-05-12", xp: 197, caught: 6 },
  { date: "2024-05-13", xp: 197, caught: 4 },
  { date: "2024-05-14", xp: 448, caught: 12 },
  { date: "2024-05-15", xp: 473, caught: 10 },
  { date: "2024-05-16", xp: 338, caught: 10 },
  { date: "2024-05-17", xp: 499, caught: 11 },
  { date: "2024-05-18", xp: 315, caught: 9 },
  { date: "2024-05-19", xp: 235, caught: 5 },
  { date: "2024-05-20", xp: 177, caught: 6 },
  { date: "2024-05-21", xp: 82, caught: 3 },
  { date: "2024-05-22", xp: 81, caught: 3 },
  { date: "2024-05-23", xp: 252, caught: 7 },
  { date: "2024-05-24", xp: 294, caught: 5 },
  { date: "2024-05-25", xp: 201, caught: 6 },
  { date: "2024-05-26", xp: 213, caught: 4 },
  { date: "2024-05-27", xp: 420, caught: 12 },
  { date: "2024-05-28", xp: 233, caught: 5 },
  { date: "2024-05-29", xp: 78, caught: 3 },
  { date: "2024-05-30", xp: 340, caught: 7 },
  { date: "2024-05-31", xp: 178, caught: 6 },
  { date: "2024-06-01", xp: 178, caught: 5 },
  { date: "2024-06-02", xp: 470, caught: 10 },
  { date: "2024-06-03", xp: 103, caught: 4 },
  { date: "2024-06-04", xp: 439, caught: 9 },
  { date: "2024-06-05", xp: 88, caught: 3 },
  { date: "2024-06-06", xp: 294, caught: 6 },
  { date: "2024-06-07", xp: 323, caught: 9 },
  { date: "2024-06-08", xp: 385, caught: 8 },
  { date: "2024-06-09", xp: 438, caught: 12 },
  { date: "2024-06-10", xp: 155, caught: 5 },
  { date: "2024-06-11", xp: 92, caught: 3 },
  { date: "2024-06-12", xp: 492, caught: 10 },
  { date: "2024-06-13", xp: 81, caught: 3 },
  { date: "2024-06-14", xp: 426, caught: 9 },
  { date: "2024-06-15", xp: 307, caught: 9 },
  { date: "2024-06-16", xp: 371, caught: 8 },
  { date: "2024-06-17", xp: 475, caught: 13 },
  { date: "2024-06-18", xp: 107, caught: 4 },
  { date: "2024-06-19", xp: 341, caught: 7 },
  { date: "2024-06-20", xp: 408, caught: 11 },
  { date: "2024-06-21", xp: 169, caught: 5 },
  { date: "2024-06-22", xp: 317, caught: 7 },
  { date: "2024-06-23", xp: 480, caught: 13 },
  { date: "2024-06-24", xp: 132, caught: 4 },
  { date: "2024-06-25", xp: 141, caught: 5 },
  { date: "2024-06-26", xp: 434, caught: 9 },
  { date: "2024-06-27", xp: 448, caught: 12 },
  { date: "2024-06-28", xp: 149, caught: 5 },
  { date: "2024-06-29", xp: 103, caught: 4 },
  { date: "2024-06-30", xp: 446, caught: 10 },
]

const chartConfig = {
  progress: {
    label: "Progress",
  },
  xp: {
    label: "XP Gained",
    color: "var(--primary)",
  },
  caught: {
    label: "Pokémon Caught",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Trainer Progress</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            XP gained and Pokémon caught, last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            multiple={false}
            value={timeRange ? [timeRange] : []}
            onValueChange={(value) => {
              setTimeRange(value[0] ?? "90d")
            }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={timeRange}
            onValueChange={(value) => {
              if (value !== null) {
                setTimeRange(value)
              }
            }}
          >
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillXp" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-xp)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-xp)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCaught" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-caught)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-caught)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="caught"
              type="natural"
              fill="url(#fillCaught)"
              stroke="var(--color-caught)"
              stackId="a"
            />
            <Area
              dataKey="xp"
              type="natural"
              fill="url(#fillXp)"
              stroke="var(--color-xp)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}