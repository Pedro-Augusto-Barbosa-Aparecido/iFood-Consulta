import { prismaClient } from "../../../utils/prisma";

export type ProductCreateParams = {
    name: string
    description: string
    price: number
    user: string

}

export type ProductCreateReturn = {
    success: boolean
    err?: any

}

export default class CreateProductController {
    async create(product: ProductCreateParams): Promise<ProductCreateReturn> {
        try {
            await prismaClient.product.create({
                data: {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    isSold: false,
                    creator: {
                        connect: {
                            id: product.user
                        }
                    }
                }
            });

            return {
                success: true
            }

        } catch(err) {
            console.log(err)
            return {
                success: false,
                err
            }

        }

    }

}
