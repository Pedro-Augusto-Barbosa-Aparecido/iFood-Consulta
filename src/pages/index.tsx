import type { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from 'nookies';
import { useContext, useEffect, useState } from 'react';
import api from '../apis/api';
import Card from '../components/card';
import { AuthContext } from '../context/auth';

export interface ProductList {
  id: string
  name: string
  description: string
  price: number
  isSold: boolean
  creatorName: string

}

const Home: NextPage = () => {
  const [products, setProduct] = useState<ProductList[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.post("/api/product/get-all", { userId: user ? user.id : "" }).then((res) => {
      setProduct(res.data.products);
      setTotalProducts(res.data.total);
    })
  }, [user]);

  return (
    <main className='p-12'>
      <div className='flex items-center justify-between'>
        <span className='text-3xl mb-4'>Hello, {user && user.name}</span>
        <span className='text-2xl mb-4 mr-8 text-gray-400'>Total: { totalProducts }</span>
      </div>
      <hr className='mt-8' />
      <div className='mt-4 h-full m-auto flex flex-wrap'>
        { 
          
          products.length === 0 && 
          <div className='flex justify-center items-center w-full'>
            <p className='text-xl text-gray-500 mt-8'>Nenhum produto foi cadastrado</p>
          </div> 
        
        }
        { products.map((product, index) => {
          return (
            <Card 
              key={index}
              creatorName={product.creatorName}
              name={product.name} 
              price={product.price}
              isSold={product.isSold} 
              description={product.description} 
            />
          );
        }) }
      </div>
      <hr className='mt-16' />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["auth.token"]: token } = parseCookies(ctx);

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
