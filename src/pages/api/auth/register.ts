import { v4 as uuid } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";
import CreateUserController from "../../../database/controllers/user/CreateUserController";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const userController = new  CreateUserController();
    
    const { user } = req.body;
    const userRet = await userController.register(user);

    if (userRet.err)
        return res.status(500).send({ ...userRet, token: uuid() });
    return res.status(201).send(userRet);

}
