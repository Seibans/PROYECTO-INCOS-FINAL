"use client"

import {TrendingUp} from "lucide-react"
import {
	Area,
	AreaChart,
	ResponsiveContainer,

	Tooltip,
	XAxis,
	YAxis
} from "recharts";

const dataGrafico = [
	{
		ano: "2016",
		nuevos:4000,
		viejos: 2000
	},
	{
		ano: "2017",
		nuevos:400,
		viejos: 2000
	},
	{
		ano: "2018",
		nuevos:4000,
		viejos: 200
	},
	{
		ano: "2019",
		nuevos:3000,
		viejos: 400
	},
	{
		ano: "2020",
		nuevos:40,
		viejos: 20
	},
	{
		ano: "2021",
		nuevos:5000,
		viejos: 2000
	},
	{
		ano: "2022",
		nuevos:4025,
		viejos: 2000
	},
	{
		ano: "2023",
		nuevos:4250,
		viejos: 2100
	}
]

export const DistribuidoresComponent = () => {
  return (
	<div className="mt-5">
		<p className="text-3xl mb-3">24.458</p>
		<div className="flex gap-x-5 mb-5">
			<div className="flex items-center gap-2 px-3 bg-[#16C8C7] text-white rounded-xl w-fit">
				8,5%
				<TrendingUp strokeWidth={1} className="h-4 w-4"/>
			</div>
			<p className="text-slate-500">+44 incremento</p>
		</div>
		<div className="h-[350px]">
			<ResponsiveContainer width={"100%"} height={"100%"}>
				<AreaChart
					width={730}
					height={250}
					data={dataGrafico}
					margin={{top: 10, right: 30, left:0, bottom:0}}>
					<defs>
						<linearGradient id="colorUv" x1={"0"} y1={0} x2={0} y2={1}>
							<stop offset={"5%"} stopColor="#887CFD" stopOpacity={0.8}/>
							<stop offset={"95%"} stopColor="#887CFD" stopOpacity={0}/>
						</linearGradient>
						<linearGradient id="colorPv" x1={"0"} y1={0} x2={0} y2={1}>
							<stop offset={"5%"} stopColor="#82ca9d" stopOpacity={0.8}/>
							<stop offset={"95%"} stopColor="#82ca9d" stopOpacity={0}/>
						</linearGradient>
					</defs>
					<XAxis dataKey={"ano"}/>
					<YAxis/>
					<Tooltip/>
					<Area
						type="monotone"
						dataKey={"nuevos"}
						stroke="#887CFD"
						fillOpacity={1}
						fill="url(#colorUv)"
						/>
					<Area
						type="monotone"
						dataKey={"viejos"}
						stroke="#82ca9d"
						fillOpacity={1}
						fill="url(#colorPv)"
						/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	</div>
  )
}
