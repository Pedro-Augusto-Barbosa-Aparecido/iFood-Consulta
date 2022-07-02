import { NextApiRequest, NextApiResponse } from "next";
import GetProductController from "../../../database/controllers/product/GetProductController";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.body;

    if (!userId)
        return res.status(200).send({
            total: 0,
            products: []
        });

    const _productController = new GetProductController();
    const products = await _productController.getAll({user: userId});

    return res.send({
        total: products.products.length,
        ...products
    });

}
