import { FormEvent, useContext, useState } from "react";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdAlternateEmail, MdDriveFileRenameOutline } from "react-icons/md";

import api from "../../apis/api";
import axios from "axios";
import { AuthContext } from "../../context/auth";

export default function RegisterForm () {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [viewPass, setViewPass] = useState<boolean>(false);
    const { signInOnRegister } = useContext(AuthContext);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const user = {
            name,
            email,
            password
        }

        console.log(user);

        api.post("/api/auth/register", {
            user
        }).then(response => response.data).then(data => {
            signInOnRegister({ email: data.email, token: data.token, user: data.user });
        });

    }

    const changeVisibilityPassword = () => setViewPass(state => !state);

    return (
        <div className="w-full flex justify-center">
            <form
                onSubmit={handleSubmit} 
                className="w-2/6 items-center justify-center border-solid border-gray-100 border-2 rounded-md mt-12 p-16">
                <span className="text-2xl mb-16">Venda seu alimento aqui!!</span>
                <div className="relative flex w-full flex-col p-0 m-0 mb-4 justify-start">
                    <label className="text-xl mt-10" htmlFor="name">Name: </label>
                    <input 
                        className="p-2 border-2 rounded-md" 
                        placeholder="Name..." 
                        type={"text"} 
                        id="name" 
                        name="name"
                        onChange={(event) => setName(event.target.value)}
                    />
                    <MdDriveFileRenameOutline 
                        className="absolute top-20 opacity-30 right-4"
                        size={20}
                    />
                </div>
                <div className="relative flex w-full flex-col p-0 m-0 mb-4 justify-start">
                    <label className="text-xl" htmlFor="email">Email: </label>
                    <input 
                        className="p-2 border-2 rounded-md" 
                        type={"email"} 
                        id="email" 
                        name="email" 
                        placeholder="E-mail..." 
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <MdAlternateEmail 
                        className="absolute top-10 opacity-30 right-4"
                        size={20}
                    />
                </div>
                <div className="relative flex w-full flex-col p-0 m-0 mb-4 justify-start">
                    <label className="text-xl" htmlFor="password">Password: </label>
                    <input 
                        className="p-2 border-2 rounded-md" 
                        type={viewPass ? "text" : "password"} 
                        id="password" 
                        name="password"
                        placeholder="Digite uma senha.." 
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {
                        viewPass 
                        ? 
                        <AiOutlineEye 
                            className="absolute top-10 opacity-30 right-4 cursor-pointer active:cursor-default"
                            onClick={changeVisibilityPassword}
                            size={20}
                        />
                        :                     
                        <AiOutlineEyeInvisible
                            className="absolute top-10 opacity-30 right-4 cursor-pointer active:cursor-default"
                            onClick={changeVisibilityPassword}
                            size={20}
                        />
                    }
                </div>
                <button className="rounded-lg mt-2 border-2 py-2 px-3 w-full bg-blue-500 active:scale-75">
                    Cadastrar
                </button>
                <div className="mt-2">
                    <Link href="/login">
                        <a className="text-blue-300 text-sm underline">Já possuo conta...</a>
                    </Link>
                </div>
            </form>
        </div>
    );

}