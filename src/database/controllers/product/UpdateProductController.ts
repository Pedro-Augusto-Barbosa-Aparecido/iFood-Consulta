import { prismaClient } from "../../../utils/prisma";

export type ProductBuyParams = {
    id: string
    emailBuyer: string

}

export default class UpdateProductController {
    async buyProduct(product: ProductBuyParams) {
        try {
            const _product = await prismaClient.product.findFirst({
                where: {
                    id: product.id
                }
            });

            if (!_product) 
                return {
                    success: false,
                    err: "Produto não existe"
                }
            
            await prismaClient.product.update({
                data: {
                    isSold: true
                },
                where: {
                    id: product.id
                }
            });

            return {
                success: true,
                product: _product.name
            }

        } catch (err) {
            return {
                success: false,
                err
            }

        }

    }
}
