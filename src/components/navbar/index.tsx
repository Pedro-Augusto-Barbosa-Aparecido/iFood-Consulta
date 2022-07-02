import style from "./styles.module.css";
import Link from "next/link";

export default function NavBar() {
    return (
        <nav className={`flex w-screen items-center justify-end px-4 py-2 h-16 bg-red-400`}>
            <div className="flex items-center justify-between w-full">
                <p className="text-2xl">Ichiraku Rámen</p>
                <Link href={"/register-form"} className="px-2">
                    Login
                </Link> 
            </div>
        </nav>
    );

}