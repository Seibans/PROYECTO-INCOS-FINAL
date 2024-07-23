
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xMHI4zRkQuW
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Banknote, Currency, ListOrdered, TicketCheck, RefreshCcwDot, Send, Settings } from 'lucide-react';
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
export const PagosComponent = () => {
	return (
		<div className="flex h-screen w-full flex-col bg-background">
			{/* <header className="flex h-14 items-center justify-between border-b bg-card px-4">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Banknote className="h-6 w-6 text-primary" />
          <span className="text-lg font-medium">Crypto Gateway</span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <img src="/placeholder.svg" width={36} height={36} alt="Avatar" className="rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header> */}
			<main className="flex-1 overflow-auto">
				<section className="px-4 py-6">
					<div className="mb-6 flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-bold">Registro de Pagos</h1>
							<p className="text-muted-foreground">Administracion de pagos de la veterinaria.</p>
						</div>
						<Button variant="outline" size="icon">
							<RefreshCcwDot className="h-5 w-5" />
						</Button>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<Card>
							<CardContent className="flex flex-col items-start gap-2">
								<div className="text-muted-foreground">Ingresos Total</div>
								<div className="text-2xl font-bold">
									<span className="text-primary">0.00</span> Bs.
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="flex flex-col items-start gap-2">
								<div className="text-muted-foreground">Pagos Pendientes</div>
								<div className="text-2xl font-bold">12</div>
							</CardContent>
						</Card>
					</div>
				</section>
				<section className="border-t bg-card px-4 py-6">
					<div className="mb-6 flex items-center justify-between">
						<h2 className="text-xl font-bold">Acciones</h2>
					</div>
					<div className="grid grid-cols-3 gap-4">
						<Link href="#" className="group flex flex-col items-center gap-2" prefetch={false}>
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors group-hover:bg-primary/80">
								<Send className="h-6 w-6" />
							</div>
							<span className="text-sm font-medium">Registrar</span>
						</Link>
						<Link href="#" className="group flex flex-col items-center gap-2" prefetch={false}>
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors group-hover:bg-primary/80">
								<TicketCheck className="h-6 w-6" />
							</div>
							<span className="text-sm font-medium">Recibir</span>
						</Link>
						<Link href="#" className="group flex flex-col items-center gap-2" prefetch={false}>
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors group-hover:bg-primary/80">
								<Currency className="h-6 w-6" />
							</div>
							<span className="text-sm font-medium">Observar</span>
						</Link>
					</div>
				</section>
				<section className="border-t bg-card px-4 py-6">
					<div className="mb-6 flex items-center justify-between">
						<h2 className="text-xl font-bold">Transacciones Recientes</h2>
						<Link href="#" className="text-primary" prefetch={false}>
							Ver Todo
						</Link>
					</div>
					<div className="grid gap-4">
						<Card>
							<CardContent className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
										<Send className="h-5 w-5 text-muted-foreground" />
									</div>
									<div>
										<div className="font-medium">Sent to John Doe</div>
										<div className="text-sm text-muted-foreground">0.05 Bs. - 2 hours ago</div>
									</div>
								</div>
								<div className="text-red-500">-0.05 Bs.</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
										<TicketCheck className="h-5 w-5 text-muted-foreground" />
									</div>
									<div>
										<div className="font-medium">Received from Jane Smith</div>
										<div className="text-sm text-muted-foreground">0.12 Bs. - 1 day ago</div>
									</div>
								</div>
								<div className="text-green-500">+0.12 Bs.</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
										<Currency className="h-5 w-5 text-muted-foreground" />
									</div>
									<div>
										<div className="font-medium">Exchanged Bs. to ETH</div>
										<div className="text-sm text-muted-foreground">0.2 Bs. to 3.5 ETH - 3 days ago</div>
									</div>
								</div>
								<div className="text-primary">0.2 Bs.</div>
							</CardContent>
						</Card>
					</div>
				</section>
			</main>
			{/* <footer className="flex h-14 items-center justify-between border-t bg-card px-4">
				<Link href="#" className="group flex flex-col items-center gap-1" prefetch={false}>
					<div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors group-hover:bg-primary/80">
						<Send className="h-5 w-5" />
					</div>
					<span className="text-xs font-medium">Send</span>
				</Link>
				<Link href="#" className="group flex flex-col items-center gap-1" prefetch={false}>
					<div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors group-hover:bg-primary/80">
						<TicketCheck className="h-5 w-5" />
					</div>
					<span className="text-xs font-medium">Receive</span>
				</Link>
				<Link href="#" className="group flex flex-col items-center gap-1" prefetch={false}>
					<div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors group-hover:bg-primary/80">
						<Currency className="h-5 w-5" />
					</div>
					<span className="text-xs font-medium">Exchange</span>
				</Link>
				<Link href="#" className="group flex flex-col items-center gap-1" prefetch={false}>
					<div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors group-hover:bg-primary/80">
						<ListOrdered className="h-5 w-5" />
					</div>
					<span className="text-xs font-medium">Transactions</span>
				</Link>
				<Link href="#" className="group flex flex-col items-center gap-1" prefetch={false}>
					<div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors group-hover:bg-primary/80">
						<Settings className="h-5 w-5" />
					</div>
					<span className="text-xs font-medium">Settings</span>
				</Link>
			</footer> */}
		</div>

	)
}