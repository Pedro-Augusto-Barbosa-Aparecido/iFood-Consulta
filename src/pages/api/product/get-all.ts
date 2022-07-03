import { NextApiRequest, NextApiResponse } from "next";
import GetProductController from "../../../database/controllers/product/GetProductController";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { userId, onlyToSell } = req.body;

    const _productController = new GetProductController();
    var products = null;
    if (!userId) 
        products = await _productController.all();
    else
        products = await _productController.getAll({user: userId});

    if (onlyToSell) 
        products.products = products.products.filter((prod) => !prod.isSold);

    return res.send({
        total: products.products.length,
        ...products
    });

}
