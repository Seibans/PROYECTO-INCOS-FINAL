import { ErrorCard } from "@/components/auth/error-card";

const AuthErrorPage = () => {
	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<ErrorCard />
		</div>
	)
}

export default AuthErrorPage