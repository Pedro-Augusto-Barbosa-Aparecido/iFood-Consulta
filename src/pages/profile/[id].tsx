import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Card from "../../components/card";
import { prismaClient } from "../../utils/prisma";
import { VerifyCookies } from "../../utils/verifierCookies";

type UserProfileProps = {
    name: string
    email: string
    products_sold: Array<{
        name: string,
        description: string,
        price: number,
        id: string,
        isSold: boolean
    }>,
    products_sell: Array<{
        name: string,
        description: string,
        price: number,
        id: string,
        isSold: boolean
    }>
}

export default function Profile ({ user }: { user: UserProfileProps }) {
    const { isFallback } = useRouter();

    return (
        <main className="flex w-full h-full items-center justify-center">
            { isFallback && <p>Carregando...</p> }
            <div className="w-2/3 mt-16 border-2 p-4 rounded-md border-black">
                <h1 className="text-2xl">{ user.name }</h1>
                <hr className="my-8" /> 
                <div>
                    <div className="ml-4">
                        <h2>Produtos Vendidos</h2>
                        <span>Quantidade de produtos vendidos: { user.products_sold.length }</span>
                    </div>
                    { 
                        user.products_sold.length === 0 &&
                        <div className="flex items-center p-16 justify-center w-full">
                            <span>Você não vendeu nenhum produto ainda</span>
                        </div> 
                    }
                    <div className="flex items-start justify-start w-full flex-row-wrap">
                        {
                            user.products_sold.map(prod => {
                                return <Card
                                        key={prod.id}
                                        productId={prod.id}
                                        creatorName={user.name}
                                        description={prod.description}
                                        isSold={prod.isSold}
                                        name={prod.name}
                                        possibleBuyer={""}
                                        price={prod.price}
                                        creatorEmail={user.email}
                                    />
                            })
                        }
                    </div>
                </div>
                <hr className="my-8" /> 
                <div>
                    <div className="ml-4">
                        <h2>Produtos para Vender</h2>
                        <span>Quantidade de produtos a serem vendidos: { user.products_sell.length }</span>
                    </div>
                    { 
                        user.products_sell.length === 0 &&
                        <div className="flex items-center p-16 justify-center w-full">
                            <span>Você não têm produtos para vender</span>
                        </div> 
                    }
                    <div className="flex items-start justify-start w-full flex-row-wrap">
                        {
                            user.products_sell.map(prod => {
                                return <Card
                                        key={prod.id}
                                        productId={prod.id}
                                        creatorName={user.name}
                                        description={prod.description}
                                        isSold={prod.isSold}
                                        name={prod.name}
                                        possibleBuyer={""}
                                        price={prod.price}
                                        creatorEmail={user.email}
                                    />
                            })
                        }
                    </div>
                </div>
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

    const user = await prismaClient.user.findFirst({
        where: {
            id: id
        },
        select: {
            name: true,
            email: true,
            products: {
                select: {
                    name: true,
                    description: true,
                    price: true,
                    id: true,
                    isSold: true
                }
            }
        }
    });

    if (!user)
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }

    const _user = {
        name: user.name,
        email: user.email,
        products_sold: user.products.filter(prod => prod.isSold),
        products_sell: user.products.filter(prod => !prod.isSold)
    }
 
    return {
        props: {
            user: _user
        },
        revalidate: 60 * 2 * 1 // 2 minutos
    }
}
