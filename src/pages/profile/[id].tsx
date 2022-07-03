import { GetStaticProps } from "next";

export default function Profile () {
    return (
        <></>
    );

}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {

        },
        revalidate: 60 * 2 * 1 // 2 minutos
    }
}
