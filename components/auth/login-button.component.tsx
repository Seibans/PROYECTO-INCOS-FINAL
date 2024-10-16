"use client";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/login-form.component";
// TODO: FORMA DE IMPLEMENTAR UN COMPONENTE MODAL
interface LoginButtonProps {
	children: React.ReactNode;
	mode?: "modal" | "redirect",
	asChild?: boolean;
}

export function LoginButton({
	children,
	mode = "redirect",
	asChild
}: LoginButtonProps) {
	const router = useRouter();
    const onClick = () => {
        router.push("/auth/login");
    }

    if (mode==="modal"){
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent className="w-auto bg-transparent border-none">
                    <LoginForm />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}       
        </span>
    )
}
