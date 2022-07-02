import style from "./styles.module.css";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { destroyCookie } from "nookies";
import Router from "next/router";

export default function NavBar() {
    const { isAuthentication, destroyUserInfo } = useContext(AuthContext);

    const handleLogout = async () => {
        destroyCookie(undefined, 'auth.token', {path: '/'});
        destroyUserInfo();

        Router.push("/login");

    }

    return (
        <nav className={`flex w-screen items-center justify-end px-4 py-2 h-16 bg-red-400`}>
            <div className="flex items-center justify-between w-full">
                <p className="text-2xl">Ichiraku Rámen</p>
                {
                    isAuthentication ?
                    <button onClick={handleLogout} className="text-xl text-center px-6">
                        Sign Out
                    </button> :
                    <Link href={"/login"}>
                        <a className="px-8 text-xl">Login</a>
                    </Link> 
                }
            </div>
        </nav>
    );

}