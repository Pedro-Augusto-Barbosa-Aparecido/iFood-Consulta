import { NextApiRequest, NextApiResponse } from "next";
import CreateProductController from "../../../database/controllers/product/CreateProductController";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { product, userId } = req.body;
    const productController = new CreateProductController();

    const _product = await productController.create({ ...product, user: userId });

    return res.send({ ..._product });

}
