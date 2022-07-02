import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineSell, MdSell } from "react-icons/md";

export interface ProductProps {  
  name: string
  description: string
  price: number
  productId: string
  isSold: boolean
  creatorName: string
  creatorEmail?: string
  sellScreen?: boolean

}

export default function Card (props: ProductProps) {
    const productId = props.productId;
    const creatorEmail = props.creatorEmail;

    return (
        <div className="flex flex-col justify-center p-8 border-2 w-80 m-4 border-black rounded-md h-fit">
            <span className="text-2xl">{ props.name }</span>
            <hr className="mt-4" />
            <p
                className="mt-3"
            >{ props.description ? props.description : "Esse produto não tem descrição" }</p>
            <span className="text-sm mt-8">Vendido por: { props.creatorName }</span>
            <span className="text-sm">Contato: { props.creatorEmail }</span>
            <div className="flex items-center w-full">
                <div className="w-full flex mt-8 items-center align-middle justify-start">
                    <RiMoneyDollarCircleLine 
                        className="text-gray-400"
                        size={20}
                    />
                    <span className="ml-2">{ props.price.toFixed(2) }</span>
                </div>
                <div className="flex mt-8 items-center align-middle justify-start">
                    <span className="text-sm text-ellipsis w-24">{ props.isSold ? "Vendido" : "Não vendido" }</span>
                    { props.isSold ? <MdSell /> : <MdOutlineSell /> }
                </div>
            </div>
        </div>
    );

}