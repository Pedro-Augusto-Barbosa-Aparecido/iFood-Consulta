import { GetServerSideProps } from "next";
import GetProductController, { ProductListQuery } from "../../database/controllers/product/GetProductController";
import { VerifyCookies } from "../../utils/verifierCookies";
import Card from "../../components/card";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import api from "../../apis/api";
import NProgress from "nprogress";

import { BiSearch } from "react-icons/bi";

export default function Store ({ products, total }: { products: ProductListQuery[], total: number }) {
    const [totalProducts, setTotalProducts] = useState<number>(total);
    const [productsShow, setProductsShow] = useState<ProductListQuery[]>(products);
    const handleSell = () => {
        NProgress.start();
        setProductsShow([]);
        api.post("/api/product/get-all", { onlyToSell: true }).then(res => {
            setProductsShow(res.data.products);
            setTotalProducts(res.data.total);
        });
        NProgress.done();

    }

    const { user } = useContext(AuthContext);

    const buyProduct = async (props: {productID: string, productName: string}) => {
        NProgress.start();
        const product = await api.post(`/api/product/buy/${props.productID}`, {
            emailBuyer: user?.email,
        });

        if (!product.data.success) {
            alert(`Não foi possivel comprar o produto: ${props.productName}`);
        }
        else 
            alert(`Produto ${props.productName} comprado com sucesso`);

        handleSell();

        NProgress.done();
    };

    return (
        <main>
            <div className="flex ml-4 mt-8 items-center justify-between mr-4">
                <h1 className="text-2xl">Compre aqui...</h1>
                <div className="flex w-96 justify-between items-center">
                    <h2 className="text-md mt-1 text-gray-500">Quantidade de produtos a venda: { totalProducts }</h2>
                    <div 
                        className="mt-1 mr-3 flex items-center justify-center bg-yellow-400 p-3 rounded-md active:scale-90 active:cursor-default hover:opacity-80 hover:cursor-pointer"
                        onClick={handleSell}
                    >
                        <BiSearch 
                            className="text-md mr-2"
                        />
                        <button className="text-md">Search</button>
                    </div>
                </div>
            </div>
            <div className="flex items-start justify-start flex-wrap">
            { 
                totalProducts === 0 && 
                <div className="w-full px-12 text-center">
                    <hr className="mt-12 mb-12" />
                    <span className="text-2xl text-gray-500">Não há produtos para vender!</span>
                    <hr className="mt-12" />
                </div> 
            }
            { 
                productsShow.map((product, index) => {
                    return (
                        <Card
                            key={product.id}
                            creatorName={product.creator.name}
                            description={product.description || ""}
                            isSold={product.isSold}
                            name={product.name}
                            price={product.price}
                            productId={product.id || ""}
                            creatorEmail={product.creator.email}
                            possibleBuyer={user?.email || ""}
                            sellScreen
                            button={
                            <div className="flex justify-end mt-8">
                                <button
                                    onClick={() => buyProduct({productID: product.id || "", productName: product.name})}
                                    className="rounded-md p-4 bg-red-400 w-full hover:opacity-80 active:scale-90"
                                >
                                    Comprar
                                </button>
                            </div>
                            }
                        />
                    );
                }) 
            }
            </div>
        </main>
    );    

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const token = VerifyCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    const productsController = new GetProductController();
    var { products } = await productsController.getAll({ });
    products = products.filter((prod) => !prod.isSold);
    return {
        props: {
            products,
            total: products.length
        },
    }

}