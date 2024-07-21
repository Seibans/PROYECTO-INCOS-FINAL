import { Info, LucideIcon } from "lucide-react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@/components/ui/tooltip";

type CustomTooltipProps = {
	content: string
}

export function CustomTooltip(props: CustomTooltipProps){
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Info strokeWidth={1} className="h-5 w-5"/>
				</TooltipTrigger>
				<TooltipContent>
					<p>{props.content}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}