import { GetServerSideProps } from "next";
import { destroyCookie } from "nookies";

export default function Logout () {
    return <></>;

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    destroyCookie(ctx, 'auth.token', { path: '/' });

    return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }

};
