import type { GetServerSideProps, NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import api from '../apis/api';
import Card from '../components/card';
import { AuthContext } from '../context/auth';
import { VerifyCookies } from '../utils/verifierCookies';
import NProgress from "nprogress";
import { Circles } from "react-loader-spinner";
import Link from 'next/link';
import { IoBagAdd } from "react-icons/io5";

export interface ProductList {
  id: string
  name: string
  description: string
  price: number
  isSold: boolean
  creator: {
    name: string
    email: string
  }

}

const Home: NextPage = () => {
  const [products, setProduct] = useState<ProductList[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    NProgress.start();
    setIsLoading(true);
    api.post("/api/product/get-all", { userId: user ? user.id : "" }).then((res) => {
      setProduct(res.data.products);
      setTotalProducts(res.data.total);
    });
    setIsLoading(false);
    NProgress.done();
  }, [user]);

  return (
    <main className='p-12'>
      <div className='flex items-center justify-between'>
        <span className='text-3xl mb-4'>Hello, {user && user.name}</span>
        <span className='text-2xl mb-4 mr-8 text-gray-400'>Total: { totalProducts }</span>
      </div>
      <div className='flex justify-end items-start'>
        <Link href="/product/create">
          <a className='hover:opacity-60 flex justify-center items-center p-4 mr-8 bg-green-500 rounded-md'>
            <IoBagAdd className='mr-2' />
            <span>Cadastrar produto</span>
          </a>
        </Link>
      </div>
      <hr className='mt-8' />
      <div className='mt-4 h-full m-auto flex flex-wrap'>
        { 
          
          products.length === 0 && 
          <div className='flex justify-center items-center w-full'>
            {
              isLoading && <Circles
                              color='#F00'
                              height={80}
                              width={80}
                            />
            }
            <p className='text-xl text-gray-500 mt-8'>Nenhum produto foi cadastrado</p>
          </div> 
        
        }
        { user && products.map((product, index) => {
          return (
            <Card 
              key={product.id}
              creatorName={product.creator.name}
              productId={product.id}
              name={product.name} 
              price={product.price}
              isSold={product.isSold} 
              description={product.description} 
              creatorEmail={user.email}
              possibleBuyer={""}
              button={
                <Link href={`/product/${product.id}`}>
                  <a 
                    className='text-center bg-yellow-400 mt-8 p-2 rounded hover:opacity-80 active:scale-90'
                  >
                    Detalhe
                  </a>
                </Link>
              }
            />
          );
        }) }
      </div>
      <hr className='mt-16' />
    </main>
  )
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
  
  return {
    props: {}
  }

}

export default Home;
