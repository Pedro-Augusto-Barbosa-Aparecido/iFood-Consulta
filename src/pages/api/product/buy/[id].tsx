import { NextApiRequest, NextApiResponse } from "next";
import UpdateProductController from "../../../../database/controllers/product/UpdateProductController";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { emailBuyer } = req.body;
    const _productController = new UpdateProductController();

    const product = await _productController.buyProduct({ id: id?.toString() || "", emailBuyer });

    return res.send({
        ...product
    });

}
