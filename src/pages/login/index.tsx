import { FormEvent, useState, useContext } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import Link from "next/link";
import { AuthContext } from "../../context/auth";
import NProgress from "nprogress";

export default function Login () {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [viewPass, setViewPass] = useState<boolean>(false);
    const { signIn } = useContext(AuthContext);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        NProgress.start();
        await signIn({ email: email, password: password });
        NProgress.done();

    }

    const changeVisibilityPassword = () => setViewPass(state => !state);

    return (
        <div className="w-full flex justify-center">
            <form className="flex w-2/6 flex-col mt-28 border-2 border-gray-400 rounded-md p-8">
                <span className="text-2xl mb-4">Entre e veja seus produtos..</span>
                <div className="relative flex flex-col">
                    <label className="text-xl mb-2" htmlFor="email">Email: </label>
                    <input 
                        className="border-2 border-gray-400 rounded-md w-full p-2 placeholder:text-sm mb-4"
                        placeholder="E-mail..."
                        type={"email"} 
                        id="email" 
                        name="email" 
                        onChange={event => setEmail(event.target.value)}
                    />
                    <MdAlternateEmail 
                        className="absolute bottom-7 opacity-30 right-4"
                        size={20}
                    />
                </div>
                <div className="relative flex flex-col">
                    <label className="text-xl mb-2" htmlFor="password">Password: </label>
                    <input 
                        className="border-2 border-gray-400 rounded-md w-full p-2 placeholder:text-sm mb-4"
                        placeholder="Digite sua senha..."
                        type={viewPass ? "text" : "password"} 
                        name="password"
                        id="password"
                        onChange={event => setPassword(event.target.value)}
                    />
                    {
                        viewPass 
                        ? 
                        <AiOutlineEye 
                            className="absolute bottom-7 opacity-30 right-4 cursor-pointer active:cursor-default"
                            onClick={changeVisibilityPassword}
                            size={20}
                        />
                        :                     
                        <AiOutlineEyeInvisible
                            className="absolute bottom-7 opacity-30 right-4 cursor-pointer active:cursor-default"
                            onClick={changeVisibilityPassword}
                            size={20}
                        />
                    }
                </div>
                <button
                    type="submit"
                    className="border-2 border-blue-500 bg-blue-600 rounded-md p-2 active:scale-75 w-full"
                    onClick={handleSubmit}
                >Entrar</button>
                <div className="mt-1">
                    <Link href="register-form">
                        <a className="underline text-blue-400 text-sm">Não tenho uma conta...</a>
                    </Link>
                </div>
            </form>
        </div>
    );

}