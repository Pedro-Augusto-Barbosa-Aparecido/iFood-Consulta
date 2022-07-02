import { prismaClient } from "../../../utils/prisma";

export type ProductListParams = {
    user?: string
}

export type ProductListQuery = {
    name: string
    description: string | null
    isSold: boolean
    price: number
    creator: {
        id: string,
        name: string,
        email: string
    }

}

export type ProductListReturn = {
    success: boolean
    products: ProductListQuery[]
    err?: any
}

export default class GetProductController {
    async getAll (query: ProductListParams): Promise<ProductListReturn> {
        try {
            const _products = await prismaClient.product.findMany({
              where: {
                creator: {
                    id: {
                        equals: query.user
                    }
                }
              },
              select: {
                name: true,
                description: true,
                price: true,
                isSold: true,
                creator: {
                    select: {
                        name: true,
                        email: true,
                        id: true
                    }
                }
              }  
            });

            return {
                success: true,
                products: _products
            }

        } catch (err) {
            console.log(err)
            return {
                success: false,
                products: [],
                err
            }

        }

    }

}
