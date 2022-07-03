import { GetStaticPaths, GetStaticProps } from "next";
import { prismaClient } from "../../utils/prisma";
import { MdSell } from "react-icons/md";
import { useRouter } from "next/router";
import { MutatingDots } from "react-loader-spinner";

import Link from "next/link";

type ProductDetailProps = {
    name: string;
    description: string;
    isSold: boolean;
    creator: {
        name: string;
        email: string;
    };
    price: number;
}

export default function DetailProduct (props: { product: ProductDetailProps }) {
    const { isFallback } = useRouter();

    if (isFallback) {
        return (
            <main className="flex items-center justify-center w-full h-full">
                <div className="mt-24">
                    <MutatingDots color="#000" />
                </div>
            </main>
        );

    }

    return (
        <main className="flex flex-col items-start ml-24 justify-center h-full">
            <div className="mt-16">
                <h1 className="text-2xl">Produto: { props.product.name }</h1>
                <div className="mt-8 flex items-center">
                    <p className="text-xl">Status do produto: </p>
                    { 
                        props.product.isSold ? 
                        <div className="flex items-center justify-between">
                            <span className="mt-1 ml-4 mr-2 text-lg">
                                Vendido
                            </span>
                            <MdSell className="mt-2" />
                        </div> : 
                        <div className="flex items-center justify-between">
                            <span className="mt-1 ml-4 mr-2 text-lg">
                                Não vendido
                            </span>
                            <MdSell className="mt-2" />
                        </div> 
                    }
                </div>
                <div className="mt-2">
                    <span className="text-xl">Descrição do produto: </span>
                    <p className="border-2 border-black rounded-none p-4 mb-4 mt-2 max-w-md text-ellipsis">
                        { props.product.description ? props.product.description : "O produto não tem descrição!" }
                    </p>
                </div>
                <div className="">
                    <span className="text-xl">Dados do criador do produto:</span>
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <span className="mt-2 font-medium">Name: </span>
                            <span className="mt-2 ml-4">{ props.product.creator.name }</span>
                        </div>
                        <div className="flex items-center">
                            <span className="mt-2 font-medium">Email de contato: </span>
                            <span className="mt-2 ml-4">{ props.product.creator.email }</span>
                        </div>
                    </div>
                </div>  
            </div>
            <div className="w-full flex justify-center items-center mt-16">
                <Link href="/">
                    <a className="bg-green-500 p-4 rounded border-green-900 border-2 hover:opacity-80 active:scale-90">Voltar para home</a>
                </Link>
            </div>
        </main>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true
    }

}

export const getStaticProps: GetStaticProps = async (ctx) => {
    // @ts-ignore
    const { id } = ctx.params;
    
    const product = await prismaClient.product.findUnique({
        where: {
            id: id
        },
        select: {
            name: true,
            description: true,
            isSold: true,
            creator: {
                select: {
                    name: true,
                    email: true
                }
            },
            price: true
        }
    })

    return {
        props: {
            product
        },
        revalidate: 60 * 60 * 3 // 3 horas
    }

}
