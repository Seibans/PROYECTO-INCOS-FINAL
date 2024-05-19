import { RegisterForm } from "@/components/auth/register-form.component";
import Image from "next/image";


const RegisterPage = () => {
    return (
        <>
            <RegisterForm/>
            <div className="absolute right-7 bottom-7">
                <Image src="/imagen-gato.svg" alt="alt" width={300} height={300} />
            </div>
        </>
    );
}
    
export default RegisterPage;
