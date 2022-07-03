import { GetServerSideProps } from "next"
import { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../../../context/auth";
import { VerifyCookies } from "../../../utils/verifierCookies"
import NProgress from "nprogress";
import api from "../../../apis/api";
import Router from "next/router";

export default function ProductCreate () {
    const [onSubmit, setOnSubmit] = useState<boolean>(false);
    const [desc, setDesc] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");

    const { user } = useContext(AuthContext);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setOnSubmit(true);
        NProgress.start();

        const res = await api.post("/api/product/create", {
            product: {
                name,
                price: parseFloat(price),
                description: desc
            },
            userId: user?.id || ""
        });

        if (res.data.success) {
            alert(`Produto: ${name}, criado com sucesso!`);
            Router.push("/");
            
        }
        else
            alert(`Não foi possivel criar o produto ${name}`);

        NProgress.done();
        setOnSubmit(false);

    }

    return (
        <main className="flex justify-center items-center h-full w-full">
            <form className="mt-16 p-12 border-2 rounded-md" onSubmit={handleSubmit}>
                <h1 className="text-2xl mb-8">Cadastre um novo produto</h1>
                <div>
                    <label className="text-xl" htmlFor="name">Name: </label>
                    <div>
                        <input 
                            placeholder="Nome do produto..." 
                            className="border-2 border-gray-600 outline-none p-2 w-full my-2 rounded-md placeholder:text-sm" 
                            onChange={ev => setName(ev.target.value)}
                            id="name" 
                            name="name" 
                        />
                    </div>
                </div>
                <div>
                    <label className="text-xl" htmlFor="desc">Description: </label>
                    <div>
                        <textarea 
                            className="border-2 border-gray-600 outline-none p-2 w-full my-2 rounded-md resize-none placeholder:text-sm" 
                            placeholder="Descrição do produto..."
                            onChange={ev => setDesc(ev.target.value)}
                            id="desc"  
                            name="desc" 
                        />
                    </div>
                </div>
                <div>
                    <label className="text-xl" htmlFor="price">Price: </label>
                    <div>
                        <input 
                            className="border-2 border-gray-600 outline-none p-2 w-full my-2 rounded-md placeholder:text-sm" 
                            placeholder="Preço do produto..."
                            onChange={ev => setPrice(ev.target.value)}
                            id="price" 
                            name="price" 
                            type={"number"}
                        />
                    </div>
                </div>
                <button 
                    className="w-full text-center p-2 bg-blue-500 rounded mt-2 hover:opacity-90 active:scale-95 active:cursor-default disabled:cursor-not-allowed"
                    disabled={onSubmit}
                >
                    Cadastrar
                </button>
            </form>
        </main>
    )

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    if (!VerifyCookies(ctx))
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }

    return {
        props: {},
    }

}
