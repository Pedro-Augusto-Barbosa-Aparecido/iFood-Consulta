import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { destroyCookie } from "nookies";
import Router from "next/router";

export default function NavBar() {
    const { isAuthentication, destroyUserInfo, user } = useContext(AuthContext);

    const handleLogout = async () => {
        destroyCookie(undefined, 'auth.token', {path: '/'});
        destroyCookie(undefined, 'auth.id', {path: '/'});
        destroyUserInfo();

        Router.push("/login");

    }

    return (
        <nav className={`flex w-screen items-center justify-end px-4 py-2 h-16 bg-red-400`}>
            <div className="flex items-center justify-between w-full">
                <Link href="/">
                    <a className="text-2xl">Ichiraku Rámen</a>
                </Link>
                {
                    isAuthentication ?
                    <div>
                        <Link href="/store">
                            <a className="text-2xl mr-8 cursor-pointer active:cursor-default">Comprar</a>
                        </Link>
                        <button onClick={handleLogout} className="text-xl text-center mr-16 px-6">
                            Sign Out
                        </button>
                        <Link href={`/profile/${user?.id}`}>
                            <a>Perfil</a>
                        </Link>
                    </div> :
                    <Link href={"/login"}>
                        <a className="px-8 text-xl">Login</a>
                    </Link> 
                }
            </div>
        </nav>
    );

}