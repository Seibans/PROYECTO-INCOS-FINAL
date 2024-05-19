import { LoginForm } from "@/components/auth/login-form.component";
import Image from "next/image";

const LoginPage = () => {
    return (
        <>
            <LoginForm/>
            <div className="absolute right-7 bottom-7">
                <Image src="/imagen-gato.svg" alt="alt" width={300} height={300} />
            </div>
        </>
    );
}

export default LoginPage;
