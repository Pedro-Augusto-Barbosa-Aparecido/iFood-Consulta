import type { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from 'nookies';

const Home: NextPage = () => {
  return (
    <h1>Hello World</h1>
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
