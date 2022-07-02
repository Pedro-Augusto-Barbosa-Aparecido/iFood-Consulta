import { GetServerSideProps } from "next";
import GetProductController, { ProductListQuery } from "../../database/controllers/product/GetProductController";

export default function Store ({ products, total }: { products: ProductListQuery[], total: number }) {
    return (
        <main>
            { total }
            { products.map((product, index) => {
                return <p key={index}>{ product.name }</p>
            }) }
        </main>
    );    

}

export const getServerSideProps: GetServerSideProps = async () => {
    const productsController = new GetProductController();
    const { products } = await productsController.getAll({ });
    
    return {
        props: {
            products,
            total: products.length
        },
    }

}