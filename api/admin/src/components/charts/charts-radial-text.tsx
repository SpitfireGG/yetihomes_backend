"use client"

import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    ChartContainer,
    type ChartConfig,
} from "@/components/ui/chart"

import Link from "next/link"

export const description = "A radial chart with text"

const chartConfig = {
    visitors: {
        label: "Enquiries",
    },
    safari: {
        label: "Total",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

type Props = {
    title: string;
    data: number;
    url: string
}

export function ChartRadialText({ title, data, url }: Props) {
    const date = new Date()

    const chartData = [
        {
            browser: "safari",
            visitors: data,
            fill: "var(--color-safari)",
        },
    ]

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle className="capitalize hover:underline">
                    <Link href={`/${url}`}>
                        {title}
                    </Link>
                </CardTitle>
                <CardDescription>{date.getFullYear()}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={0}
                        endAngle={160}
                        innerRadius={80}
                        outerRadius={110}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-muted last:fill-background"
                            polarRadius={[86, 74]}
                        />

                        <RadialBar
                            dataKey="visitors"
                            background
                            cornerRadius={10}
                        />

                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (!viewBox) return null

                                    const { cx, cy } = viewBox as { cx: number; cy: number }

                                    return (
                                        <text
                                            x={cx}
                                            y={cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan
                                                x={cx}
                                                y={cy}
                                                className="fill-foreground text-4xl font-bold"
                                            >
                                                {data ?? "-"}
                                            </tspan>
                                            <tspan
                                                x={cx}
                                                y={cy + 24}
                                                className="fill-muted-foreground capitalize"
                                            >
                                                {title}
                                            </tspan>
                                        </text>
                                    )
                                }}
                            />

                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex-col gap-2 text-sm">
                <div className="text-muted-foreground leading-none">
                    Showing total {title}
                </div>
            </CardFooter>
        </Card>
    )
}
