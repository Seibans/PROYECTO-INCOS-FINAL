import { CustomIcon } from "@/components/admin/CustomIcon.component"
import { CustomTooltip } from "@/components/admin/CustomTooltip.component"
import { cn } from "@/lib/utils"
import { LucideIcon, MoveDownRight, MoveUpRight, TrendingUp } from "lucide-react"

type CardEstadisticaProps = {
	icon: LucideIcon
	total: string
	average: number
	titulo: string
	tooltipTexto: string
}

export function CardEstadistica(props: CardEstadisticaProps) {
	return (
		<div className="shadow-sm bg-background rounded-lg p-5 py-3 hover:shadow-lg transition border">
			<div className="flex justify-between">
				<div className="flex gap-2 items-center">
					<span className="text-black dark:text-white">
						<CustomIcon icon={props.icon} />
					</span>

					<span className="text-black dark:text-white">
						{props.titulo}
					</span>
				</div>
				<span className="text-black dark:text-white">

				<CustomTooltip
					content={props.tooltipTexto}
				/>
					</span>

			</div>
			<div className="flex gap-4 mt-2 md:mt-4 text-black dark:text-white">
				<p className="text-2xl">{props.total}</p>
				<div className={cn(`flex items-center gap-1 px-2 text-xs rounded-lg h-[20px] bg-slate-200 dark:bg-slate-600`)}>
					{props.average} %
					{props.average < 20 && (
						<MoveDownRight strokeWidth={2} className="h-4 w-4" />
					)}
					{props.average > 20 && props.average < 70 && (
						<MoveUpRight strokeWidth={2} className="h-4 w-4" />
					)}
					{props.average > 70 && props.average < 100 && (
						<TrendingUp strokeWidth={2} className="h-4 w-4" />
					)}
				</div>
			</div>
		</div>
	)
}