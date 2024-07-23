/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ciFLICowt27
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
export const MedicamentosComponent = () => {
	return (
		// <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-primary to-primary-foreground">
		<div className="flex flex-col w-full min-h-screen">
			{/* <header className="bg-primary-foreground/10 py-8 px-4 md:px-6 lg:px-8"> */}
			<header className="bg-secondary-foreground/10 py-8 px-4 md:px-6 lg:px-8">
				<div className="container mx-auto flex items-center justify-between">
					<div className="flex items-center gap-4">
						{/* <img src="/placeholder.svg" alt="Tournament Logo" width={48} height={48} className="rounded-full" /> */}
						<h1 className="text-2xl font-bold text-primary-foreground">Medicamentos</h1>
					</div>
					<Button variant="outline" className="hidden md:inline-flex">
						Registrar Medicamento
					</Button>
				</div>
			</header>
			<main className="flex-1 py-8 px-4 md:px-6 lg:px-8">
				<div className="container mx-auto grid gap-8 lg:grid-cols-2">
					<section>
						<h2 className="mb-4 text-2xl font-bold text-primary-foreground">Upcoming Matches</h2>
						<div className="grid gap-4">
							{/* <Card className="bg-primary-foreground/10 p-4"> */}
							<Card className="p-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<img src="/placeholder.svg" alt="Team A Logo" width={32} height={32} className="rounded-full" />
										<span className="font-medium text-primary-foreground">Team A</span>
									</div>
									<div className="text-primary-foreground">vs</div>
									<div className="flex items-center gap-4">
										<span className="font-medium text-primary-foreground">Team B</span>
										<img src="/placeholder.svg" alt="Team B Logo" width={32} height={32} className="rounded-full" />
									</div>
								</div>
								<div className="mt-2 flex items-center justify-between text-sm text-primary-foreground/80">
									<span>April 15, 2023 - 7:00 PM</span>
									<span>Best of 3</span>
								</div>
							</Card>
							<Card className="bg-primary-foreground/10 p-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<img src="/placeholder.svg" alt="Team C Logo" width={32} height={32} className="rounded-full" />
										<span className="font-medium text-primary-foreground">Team C</span>
									</div>
									<div className="text-primary-foreground">vs</div>
									<div className="flex items-center gap-4">
										<span className="font-medium text-primary-foreground">Team D</span>
										<img src="/placeholder.svg" alt="Team D Logo" width={32} height={32} className="rounded-full" />
									</div>
								</div>
								<div className="mt-2 flex items-center justify-between text-sm text-primary-foreground/80">
									<span>April 16, 2023 - 9:00 PM</span>
									<span>Best of 5</span>
								</div>
							</Card>
							<Card className="bg-primary-foreground/10 p-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<img src="/placeholder.svg" alt="Team E Logo" width={32} height={32} className="rounded-full" />
										<span className="font-medium text-primary-foreground">Team E</span>
									</div>
									<div className="text-primary-foreground">vs</div>
									<div className="flex items-center gap-4">
										<span className="font-medium text-primary-foreground">Team F</span>
										<img src="/placeholder.svg" alt="Team F Logo" width={32} height={32} className="rounded-full" />
									</div>
								</div>
								<div className="mt-2 flex items-center justify-between text-sm text-primary-foreground/80">
									<span>April 17, 2023 - 8:00 PM</span>
									<span>Best of 3</span>
								</div>
							</Card>
						</div>
					</section>
					<section>
						<h2 className="mb-4 text-2xl font-bold text-primary-foreground">Leaderboard</h2>
						<div className="grid gap-4">
							<Card className="bg-primary-foreground/10 p-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className="bg-primary rounded-full px-3 py-1 text-xs font-medium text-primary-foreground">
											1
										</div>
										<img src="/placeholder.svg" alt="Team A Logo" width={32} height={32} className="rounded-full" />
										<span className="font-medium text-primary-foreground">Team A</span>
									</div>
									<div className="text-primary-foreground">
										<span className="font-medium">12</span> Wins
									</div>
								</div>
							</Card>
							<Card className="bg-primary-foreground/10 p-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className="bg-primary rounded-full px-3 py-1 text-xs font-medium text-primary-foreground">
											2
										</div>
										<img src="/placeholder.svg" alt="Team B Logo" width={32} height={32} className="rounded-full" />
										<span className="font-medium text-primary-foreground">Team B</span>
									</div>
									<div className="text-primary-foreground">
										<span className="font-medium">10</span> Wins
									</div>
								</div>
							</Card>
							<Card className="bg-primary-foreground/10 p-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className="bg-primary rounded-full px-3 py-1 text-xs font-medium text-primary-foreground">
											3
										</div>
										<img src="/placeholder.svg" alt="Team C Logo" width={32} height={32} className="rounded-full" />
										<span className="font-medium text-primary-foreground">Team C</span>
									</div>
									<div className="text-primary-foreground">
										<span className="font-medium">9</span> Wins
									</div>
								</div>
							</Card>
							<Card className="bg-primary-foreground/10 p-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className="bg-primary rounded-full px-3 py-1 text-xs font-medium text-primary-foreground">
											4
										</div>
										<img src="/placeholder.svg" alt="Team D Logo" width={32} height={32} className="rounded-full" />
										<span className="font-medium text-primary-foreground">Team D</span>
									</div>
									<div className="text-primary-foreground">
										<span className="font-medium">8</span> Wins
									</div>
								</div>
							</Card>
							<Card className="bg-primary-foreground/10 p-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className="bg-primary rounded-full px-3 py-1 text-xs font-medium text-primary-foreground">
											5
										</div>
										<img src="/placeholder.svg" alt="Team E Logo" width={32} height={32} className="rounded-full" />
										<span className="font-medium text-primary-foreground">Team E</span>
									</div>
									<div className="text-primary-foreground">
										<span className="font-medium">7</span> Wins
									</div>
								</div>
							</Card>
						</div>
					</section>
				</div>
			</main>
			{/* <footer className="bg-primary-foreground/10 py-4 px-4 md:px-6 lg:px-8">
				<div className="container mx-auto flex items-center justify-between">
					<p className="text-sm text-primary-foreground">&copy; 2024 Esports Tournament. All rights reserved.</p>
					<div className="flex items-center gap-4">
						<Link href="#" className="text-sm font-medium text-primary-foreground hover:underline" prefetch={false}>
							Privacy Policy
						</Link>
						<Link href="#" className="text-sm font-medium text-primary-foreground hover:underline" prefetch={false}>
							Terms of Service
						</Link>
					</div>
				</div>
			</footer> */}
		</div>
	)
}