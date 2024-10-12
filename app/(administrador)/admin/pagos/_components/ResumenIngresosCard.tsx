import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ResumenIngresosCardProps {
  title: string
  amount: string
  percentage: number
}

export function ResumenIngresosCard({ title, amount, percentage }: ResumenIngresosCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">{"Bs. " + amount}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          {percentage >= 0 ? '+' : ''}{percentage.toFixed(2)}% En comparación al período anterior
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={Math.abs(percentage)} max={100} aria-label={`${percentage}% change`} />
      </CardFooter>
    </Card>
  )
}